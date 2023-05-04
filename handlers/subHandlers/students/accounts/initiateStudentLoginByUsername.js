const {
    mySQLCommander,
    validateJWTToken,
    generateJWTToken
} = require('../../../../utils')
const { GET_STUDENT_BY_USERNAME } = require('../../../../config/sqlOperations')

const initiateStudentLoginByUsername = async ( request , response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
   

        const { body } = request
        const  {
            username = ''
        } = body || {}
          
        let params = [
            username
        ]

        const {
            results_sql, 
            success_sql,
            error_message_sql
        } = await mySQLCommander({
            sqlQuery: GET_STUDENT_BY_USERNAME, 
            params
        })

        const studentRecord = results_sql?.[0] || null

        // not found in DB
        if(!studentRecord){
            throw new Error('Account not found')
        }

        const { 
            id,
            educ_level_id,
            username:student_username,
            image_url,
            stud_lastname,
            stud_firstname,
            stud_middlename,
            course_id,
            year_level,
            section,
            stud_contact_no,
            family_contact_no,
            family_details_object,
            gender,
            activitycard_id,
            acad_dept,
            semester_id,
            acad_year_id,
            create_at,
            updated_at,
            current_semester_id,
            current_academic_year_id,
            is_graduated
        }  = studentRecord || {}

        const signedJWT = await generateJWTToken({
            id,
            educ_level_id,
            username:student_username,
            image_url,
            stud_lastname,
            stud_firstname,
            stud_middlename,
            course_id,
            year_level,
            section,
            stud_contact_no,
            family_contact_no,
            family_details_object,
            gender,
            activitycard_id,
            acad_dept,
            semester_id,
            acad_year_id,
            create_at,
            updated_at,
            current_semester_id,
            current_academic_year_id,
            is_graduated
        })

        response.json({
            success: !!success_sql,
            error_message: error_message_sql,
            data: {
                student: studentRecord,
                jwt_token: signedJWT
            },
        });
    }catch(err){
        error_message = `${err}`
        data = null
        response.json({
            success,
            error_message,
            data,
            route: request.route,

        });
    }

    console.log(`** ${request.method}: ${JSON.stringify(request.route, null, 4)}`)
}

module.exports = initiateStudentLoginByUsername