var jwtVerify = require('../../../reuse/jwtVerify');

// Requires < SQL > , < ARRAY_PARAMETER >
var query = require('../../../reuse/query')


const getDepartmentClearanceRecords = async ({res, token, params}) => {

    const {semesterId, acadYearId} = params;


    try{
        sqlResult = await query(_sql.getOneDepartementalClearance,[]);


        if(sqlResult[1] && sqlResult[1][0] ){
          sqlResult = sqlResult[1][0];

          sqlResult.message = JSON.parse(sqlResult.message || []) ;
          sqlResult.clearance_ids = JSON.parse(sqlResult.clearance_ids || []);
        }
    } catch (err){
        return(res.sendStatus(401))
    }

    return res.json({ 
      msg:'okay',
      timestamp:Date.now(),
      title:`SEND TO SMS CLEARANCE`,
      data: sqlResult || {}}
    );
}


const _sql = {
  getOneDepartementalClearance: `
    SET @username := (SELECT student_username FROM clearance_issue WHERE is_upload = '0' LIMIT 1); 

    SELECT
      username,
      CONCAT(COALESCE(studfname, '') , " ", COALESCE(studmname, '') , ' ', COALESCE(studlname, '')) AS 'studentName',
      familyphone AS 'familyPhone',
      cpnum AS 'studentContactNumber',
      COUNT(DISTINCT ci_id) AS 'IssueCount',
      CONCAT('Departamental Clearance (', sem_name, '/'  ,ay_name,")" ) AS 'context',
      CONCAT("[",group_concat(list1.message), "]") AS 'message',
      CONCAT("[ ", group_concat(list1.ci_id)," ]") AS 'clearance_ids'
        
    FROM
      (
      SELECT
        CONCAT('"',dep.name," - ",ci.context, " - ", ci.status,'"') AS 'message',
        s.username,
        s.educ_level_id,
        studfname,
        studlname,
        studmname,
        s.course,
        s.yearlevel,
        s.section,
        s.cpnum,
        s.familyphone,
        s.gender,
        s.activity_card_barcode,
        s.department,
        s.semester_id AS s_semester_id,
        s.acad_year_id AS s_acad_year_id,
        '||' AS '||_clearance_issuue',
        ci.id as ci_id,
        ci.acad_year_id,
        ci.semester_id,
        ci.departments_id,
        ci.context,
        ci.status AS clearance_status,
        account_id_by,
        account_id_status,
        ci.is_deleted,
        ci.is_upload,
        '||'AS '||_dep',
        dep.name AS d_name,
        el.name AS el_name,
        ay.name AS ay_name,
        sem.name AS sem_name,
        
        a_by.firstname AS fname_by,
        a_by.lastname AS lname_by,
        
        a_status.firstname AS fname_status,
        a_status.lastname AS lname_status
      
      FROM student_ AS s
      JOIN clearance_issue AS ci ON ci.student_username = s.username
      JOIN departments dep ON dep.id = ci.departments_id
      JOIN educ_level el ON el.id =  dep.educ_level_id
      JOIN acad_year ay ON ay.id = ci.acad_year_id
      JOIN semester sem ON sem.id = ci.semester_id
      LEFT JOIN account AS a_by ON a_by.id = ci.account_id_by
      LEFT JOIN account AS a_status ON a_status.id = ci.account_id_status
      
      WHERE s.username = @username ) AS list1
    
    GROUP BY semester_id, acad_year_id
    
    ORDER BY semester_id ASC,acad_year_id ASC LIMIT 1;`,


    account: `SELECT * FROM account`
}

module.exports = getDepartmentClearanceRecords;
