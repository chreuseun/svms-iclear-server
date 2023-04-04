const {
    mySQLCommander,
    validateJWTToken,
} = require('../../utils')
const { 
    INSERT_ONE_V2_DEPARTMENT_CLEARANCE_REQUIREMENT_RECORD,
    INSERT_SELECT_BULK_DEPT_CLEARANCE_REQUIREMENT
 } = require('../../config/sqlOperations')


const addOneDepartmentClearanceRequirementRecord =  async ( request, response ) => {
    let success = false
    let error_message = null
    let data = null

    try{
        const jwtToken =request?.headers?.authorization
        const validatedJWT = validateJWTToken(jwtToken)
        const { id:creatorAccountId } = validatedJWT
        const {
            v2_departments_id,
            initial_status,
            name,
            description,
            type,
            v2_semester_id = 0,
            v2_academic_year_id = 0
        } = request?.body || {}

       const {
        error_message_sql,
        results_sql,
        success_sql
       } =  await mySQLCommander({
            params:[
                v2_departments_id,
                creatorAccountId,
                initial_status,
                name,
                description,
                type,
                v2_semester_id,
                v2_academic_year_id
            ],
            sqlQuery: INSERT_ONE_V2_DEPARTMENT_CLEARANCE_REQUIREMENT_RECORD
        });

       const departmentDetails = await mySQLCommander({
            params:[
                v2_departments_id,
            ],
            sqlQuery: `
                SELECT * FROM v2_departments
                WHERE id = ?
            `
        });

        const {
            course_id:deptCourseID,
            acad_dept_id:deptAcadID,
            educ_level_id:deptEducLevelID
        } = departmentDetails?.results_sql?.[0] || {}

       const {
        error_message_sql: bulkInsertErrorMessage,
        results_sql: bulkInsertSQLResult,
        success_sql: bulkInsertSuccess,
       } =  await mySQLCommander({
            params:[
                results_sql?.insertId || null,
                deptCourseID, 
                deptAcadID, 
                deptEducLevelID,
                initial_status,
                v2_semester_id,
                v2_academic_year_id
            ],
            sqlQuery: INSERT_SELECT_BULK_DEPT_CLEARANCE_REQUIREMENT
        });

        const {affectedRows,message,} = bulkInsertSQLResult?.[7] || null

        response.json({
            success: success_sql && bulkInsertSuccess,
            error_message: `${error_message_sql}# ${bulkInsertErrorMessage}`,
            data: {
                bulkInsertSQLResult:{
                    affectedRows,
                    message,
                    params:[
                        results_sql?.insertId || null ,
                        deptCourseID , 
                        deptAcadID , 
                        deptEducLevelID
                    ]
                },
                results_sql
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

module.exports = addOneDepartmentClearanceRequirementRecord