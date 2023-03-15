const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { BULK_UPSERT_STUDENTS_BY_DUPLICATE_KEY } = require('../../config/sqlOperations')


/*

TO INSERT: 
    acad_dept,
    acad_year_id,
    activitycard_id,
    course_id,
    educ_level_id,
    email_address,
    family_contact_no,
    family_details_object,
    gender,
    image_url,
    password,
    section,
    semester_id,
    stud_contact_no,
    stud_firstname,
    stud_lastname,
    stud_middlename,
    username,
    year_level
*/

const bulkUpsertStudents =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        validateJWTToken(jwtToken)

        const {
           student_records_array = []
        } = request?.body || {}

    //    const {
    //     error_message_sql,
    //     results_sql,
    //     success_sql
    //    } =  await mySQLCommander({
    //         params:[
    //             student_record_array
    //         ],
    //         sqlQuery: SET_ACTIVE_SEMESTER
    //     });

        response.json({
            success: true, //success_sql,
            error_message: null, // error_message_sql,
            data:  student_records_array,// results_sql,
            query: BULK_UPSERT_STUDENTS_BY_DUPLICATE_KEY
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

module.exports = bulkUpsertStudents