const INSERT_ONE_ACCOUNT = `
    INSERT INTO account
    (
        user_type_id,
        username,
        password,
        fullname,
        lastname,
        firstname,
        middlename,
        contact_number
    )

    VALUES
    (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
`

const SELECT_USERS_BY_FILTER_NO_DATES  =`
SET @text := ?;
SET @type := ?;
SET @locked := ?;
SET @state := ?;

SELECT 
    id,
    user_type_id,
    username,
    fullname,
    lastname,
    firstname,
    middlename,
    state,
    is_locked,
    contact_number,
    created_at,
    updated_at
FROM account

WHERE state LIKE @state  
    AND is_locked LIKE @locked
    AND user_type_id LIKE @type
    
    AND (lastname LIKE @text
    OR firstname LIKE @text
    OR middlename LIKE @text
    OR username LIKE @text)
`

const SELECT_USERS_BY_FILTER_WITH_DATES  =`
SET @text := ?;
SET @type := ?;
SET @locked := ?;
SET @state := ?;
SET @dateStart := ?;
SET @dateEnd := ?;

SELECT 
    id,
    user_type_id,
    username,
    fullname,
    lastname,
    firstname,
    middlename,
    state,
    is_locked,
    contact_number,
    created_at,
    updated_at
FROM account

WHERE state LIKE @state  
    AND is_locked LIKE @locked
    AND user_type_id LIKE @type
    
    AND (lastname LIKE @text
    OR firstname LIKE @text
    OR middlename LIKE @text
    OR username LIKE @text)
    AND DATE(created_at) >= @dateStart
    AND DATE(created_at) <= @dateEnd
`

const SELECT_DEPARTMENTS_TYPES = `
SELECT 
    id as 'key',
    name as 'label',
    id as 'value',
    description

FROM departments_type 

WHERE 
    id != 1
`

const SELECT_EDUCATION_LEVELS = `
SELECT 
    id as 'key',
    name as 'label',
    id as 'value',
    code

FROM educ_level

WHERE 
    state = 1
`

const SELECT_STUDENT_GROUP_BY_EDUC_LEVEL_COURSE = `
SELECT 
    *

FROM
(
    SELECT  
        educ_level_id,
        course,
        IF(department = 'NONE', 'ALL', department) AS 'department'

    FROM student_

    GROUP BY  
        educ_level_id,
        course

    UNION SELECT  1 , 'NONE', 'ALL'
    UNION SELECT 2, 'NONE', 'ALL'
    UNION SELECT 3, '-ALL', 'ALL'
    UNION SELECT  4, '-ALL' , 'ALL'
) as main 

ORDER BY 
    educ_level_id ASC, 
    course ASC
`

const SELECT_STUDENT_GROUP_BY_EDUC_LEVEL_YEARLEVEL = `
SELECT  
    educ_level_id,
    yearlevel
    
FROM student_
            
GROUP BY  
    educ_level_id, 
    yearlevel
                
UNION SELECT  1 ,  '-ALL'
UNION SELECT 2,  '-ALL'
UNION SELECT 3, '-ALL'
UNION SELECT  4,'-ALL'
                
ORDER BY 
    educ_level_id  ASC, 
    yearlevel ASC
`

const GET_ALL_COURSES  =`
    SELECT * FROM course WHERE state = 1;
`

const INSERT_ONE_DEPARTMENT_V2 = `
INSERT INTO 
v2_departments (
    name,
    educ_level_id,
    department_type_id,
    course_id,
    year_level,
    acad_dept_id,
    department_head_officer
) VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
);

`

const GET_ALL_DEPARTMENTS_WITH_FILTER = `
SET @dept_name := ?;
SET @is_active := ?;


SELECT 
    v2Departments.id as 'key',
    v2Departments.*,
    educLevel.name as 'educ_level_name'
    
FROM v2_departments AS v2Departments
JOIN educ_level AS educLevel 
ON v2Departments.educ_level_id = educLevel.id

WHERE 
	v2Departments.is_active LIKE @is_active
    AND v2Departments.name LIKE @dept_name;
`

const UPDATE_ONE_DEPARTMENT = `
UPDATE 
    v2_departments

SET 
    name = ?,
    educ_level_id = ?,
    department_type_id = ?,
    course_id = ?,
    year_level = ?,
    acad_dept_id = ?,
    department_head_officer = ?,
    is_active = ?

WHERE id = ?;
`

const SELECT_ALL_ACCOUNT_IN_DEPARTMENTS = `
SELECT 
	a.username as username,
    a.fullname as fullname,
    a.id as account_id,
    a.user_type_id,
    vad.v2_department_id as department_id
    
FROM account as a
LEFT JOIN v2_account_departments as vad ON a.id = vad.account_id 
	AND vad.is_deleted = 0
    AND vad.v2_department_id = ?

WHERE a.user_type_id IN ( ? )

GROUP BY a.id
`

const DEACTIVATE_ACCOUNT_TO_DEPARTMENT = `
UPDATE v2_account_departments

SET is_deleted = 1,
    unique_id = NULL

WHERE 
    account_id = ?
    AND v2_department_id = ?
`

const ACTIVATE_ACCOUNT_TO_DEPARTMENT = `
INSERT INTO v2_account_departments (
    unique_id,
    v2_department_id,
    account_id
)

VALUES(
    ?,
    ?,
    ?
)
`

const GET_ALL_SEMESTERS = `
SELECT 
    * 
FROM v2_semester;
`

const SET_ACTIVE_SEMESTER = `
UPDATE 
	v2_semester
SET is_active = 0;

UPDATE 
	v2_semester
SET is_active = 1
WHERE id = ?
`

const GET_ALL_ACADEMIC_YEARS = `
SELECT 
    * 
FROM v2_academic_year
`

const INSERT_ONE_ACADEMIC_YEAR = `
INSERT INTO v2_academic_year(
    baseyear,
    name
)

VALUES (
    ? ,
    ?
)
`

const UPDATE_ACADEMIC_YEAR_BY_ID = `
UPDATE v2_academic_year
SET is_active = 0;

UPDATE v2_academic_year
SET is_active = ?
WHERE id = ?;
`

const BULK_UPSERT_STUDENTS_BY_DUPLICATE_KEY = `
INSERT v2_students(
    id,
    image_url,
    stud_firstname,
    stud_middlename,
    stud_lastname,
    stud_contact_no,
    family_contact_no,
    email_address,
    gender,
    educ_level_id,
    acad_dept,
    course_id,
    year_level,
    section,
    username
)

VALUES ? 

ON DUPLICATE KEY UPDATE 
    acad_dept = VALUES(acad_dept),
    acad_year_id = VALUES(acad_year_id),
    activitycard_id = VALUES(activitycard_id),
    course_id = VALUES(course_id),
    educ_level_id = VALUES(educ_level_id),
    email_address = VALUES(email_address),
    family_contact_no = VALUES(family_contact_no),
    family_details_object = VALUES(family_details_object),
    gender = VALUES(gender),
    image_url = VALUES(image_url),
    password = VALUES(password),
    section = VALUES(section),
    semester_id = VALUES(semester_id),
    stud_contact_no = VALUES(stud_contact_no),
    stud_firstname = VALUES(stud_firstname),
    stud_lastname = VALUES(stud_lastname),
    stud_middlename = VALUES(stud_middlename),
    username = VALUES(username),
    year_level = VALUES(year_level)    
`

const GET_ACCOUNT_DETAILS = `
SELECT 
    id,         
    username,   
    lastname,   
    middlename, 
    is_locked,  
    state,
    user_type_id,
    fullname,
    firstname,
    contact_number,
    created_at,
    updated_at

FROM account 

WHERE
    id = ?
`

const GET_DEPARTMENT_LIST_BY_ACCOUNT_ID = `
SELECT 
    v2ad.v2_department_id,
    v2d.name as v2_departments_name ,
    v2d.department_head_officer,
    v2d.educ_level_id,
    v2d.department_type_id,
    dt.name as department_type_name,
    el.name AS educ_level_name

FROM v2_account_departments as v2ad
JOIN account AS a
	ON a.id = v2ad.account_id 
		AND a.id = ?
        AND v2ad.is_deleted = 0
        AND a.user_type_id = ?
JOIN v2_departments as v2d ON
	v2ad.v2_department_id = v2d.id
    AND v2d.is_active = 1
JOIN departments_type AS dt ON
    dt.id = v2d.department_type_id
JOIN educ_level AS el ON
    el.id = v2d.educ_level_id
`

const INSERT_ONE_V2_DEPARTMENT_CLEARANCE_REQUIREMENT_RECORD = `
INSERT INTO 
    v2_department_clearance_requirement
(
    v2_departments_id, 
    creator_account_id, 
    initial_status, 
    name,
    description,
    type,
    v2_semester_id,
    v2_academic_year_id
) 

VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
)
`

const GET_DEPARTMENT_CLEARANCE_REQUIREMENT_BY_DEPARTMENT_ID = `
SELECT 
    v2DeptClr.*,
    v2DeptClr.id as 'key'

FROM v2_department_clearance_requirement AS v2DeptClr

WHERE v2_departments_id = ?;
`

const GET_ACTIVE_SEMESTER_AND_ACADEMIC_YEAR = `
SELECT 
	'v2_semester' as table_name,
    id,
    name 
FROM v2_semester
WHERE is_active = 1

UNION

SELECT 
	'v2_academic_year' as table_name,
    id,
	name 
FROM v2_academic_year
WHERE is_active = 1
`

const GET_ALL_DEPARTMENT_CLEARANCE_RECORD_OF_STUDENT = `
SELECT 
	std.id AS student_id,
    std.username AS student_username,
    std.stud_lastname AS student_lastname,
	std.stud_firstname AS student_firstname,
	std.stud_middlename AS student_middlename,
    std.year_level AS student_yearlevel,
    std.course_id AS student_course_id,
    '' AS '--DEPARTMENT_DETAILS--',
	v2Dept.id AS dept_id,
	v2Dept.name AS dept_name,
	v2Dept.educ_level_id AS educ_level_id,
	v2Dept.course_id AS course,
    v2Dept.department_type_id,
	v2Dept.year_level,
	v2Dept.acad_dept_id,
    el.name as educ_level_name,
    deptType.name as dept_type_name,
    c.id AS course_id,
    c.acad_dept AS acad_dept_id,
    '' as '--CLEARANCE_DETAILS--',
	v2DeptClrReq.*
    
FROM v2_department_clearance_requirement AS v2DeptClrReq
JOIN v2_departments AS v2Dept ON
	v2DeptClrReq.v2_departments_id = v2Dept.id
    AND v2DeptClrReq.v2_departments_id = ?
JOIN educ_level AS el ON
	el.id = v2Dept.educ_level_id
JOIN departments_type AS deptType ON
	deptType.id = v2Dept.department_type_id
LEFT JOIN course AS c ON
	c.id = v2Dept.course_id
JOIN v2_students AS std ON
	std.educ_level_id = v2Dept.educ_level_id
    AND IF(v2Dept.year_level = '*',true, std.year_level = v2Dept.year_level)
	AND IF(v2Dept.course_id = '*',true, std.course_id = v2Dept.course_id)
	AND IF(v2Dept.acad_dept_id = '*',true, std.acad_dept = v2Dept.acad_dept_id)
`

const INSERT_SELECT_BULK_DEPT_CLEARANCE_REQUIREMENT = `
SET @v2_dept_clearance_id := ?;
SET @dept_course_id := ?;
SET @dept_acad_id := ?;
SET @educ_level_id := ?;

INSERT IGNORE v2_students_department_clearance_record 
(
    unique_id,
	v2_students_id,
	v2_department_clearance_requirement_id,
	status
)  
SELECT 
    CONCAT(std.id,"-",@v2_dept_clearance_id) AS id,
	std.id as student_id,
    @v2_dept_clearance_id AS v2_dept_clearance_id,
    'APPROVED' AS status

 FROM v2_students AS std
 
 WHERE
	educ_level_id = @educ_level_id
	AND IF(
		@dept_course_id = '*',
		true, 
		std.course_id = @dept_course_id
	)
    AND IF(
		@dept_acad_id = '*',
		true, 
		std.acad_dept = @dept_acad_id
	)
`

const GET_STUDENT_DEPT_CLEARANCE_RECORD_BY_FILTER = `
SELECT 
	v2Std.stud_firstname,
    v2Std.stud_lastname,
    v2Std.stud_middlename,
	v2DepClrReq.name AS requirement_name,
    v2StdDeptClrRec.*
    
FROM v2_students_department_clearance_record AS v2StdDeptClrRec 
JOIN v2_department_clearance_requirement AS v2DepClrReq 
	ON v2DepClrReq.id = v2StdDeptClrRec.v2_department_clearance_requirement_id 
    AND v2StdDeptClrRec.v2_department_clearance_requirement_id = ?
	JOIN v2_students AS v2Std 
		ON v2Std.id = v2StdDeptClrRec.v2_students_id

`

const UPDATE_STUDENT_DEPT_CLEARANCE_RECORD_BY_ID = `
UPDATE v2_students_department_clearance_record

SET 
	status = ?

WHERE id = ?
`

module.exports = {
    INSERT_ONE_ACCOUNT,
    SELECT_USERS_BY_FILTER_NO_DATES,
    SELECT_USERS_BY_FILTER_WITH_DATES,
    SELECT_DEPARTMENTS_TYPES,
    SELECT_EDUCATION_LEVELS,
    SELECT_STUDENT_GROUP_BY_EDUC_LEVEL_COURSE,
    SELECT_STUDENT_GROUP_BY_EDUC_LEVEL_YEARLEVEL,
    GET_ALL_COURSES,
    INSERT_ONE_DEPARTMENT_V2,
    GET_ALL_DEPARTMENTS_WITH_FILTER,
    UPDATE_ONE_DEPARTMENT,
    SELECT_ALL_ACCOUNT_IN_DEPARTMENTS,
    DEACTIVATE_ACCOUNT_TO_DEPARTMENT,
    ACTIVATE_ACCOUNT_TO_DEPARTMENT,
    GET_ALL_SEMESTERS,
    SET_ACTIVE_SEMESTER,
    GET_ALL_ACADEMIC_YEARS,
    INSERT_ONE_ACADEMIC_YEAR,
    UPDATE_ACADEMIC_YEAR_BY_ID,
    BULK_UPSERT_STUDENTS_BY_DUPLICATE_KEY,
    GET_ACCOUNT_DETAILS,
    GET_DEPARTMENT_LIST_BY_ACCOUNT_ID,
    INSERT_ONE_V2_DEPARTMENT_CLEARANCE_REQUIREMENT_RECORD,
    GET_DEPARTMENT_CLEARANCE_REQUIREMENT_BY_DEPARTMENT_ID,
    GET_ACTIVE_SEMESTER_AND_ACADEMIC_YEAR,
    GET_ALL_DEPARTMENT_CLEARANCE_RECORD_OF_STUDENT,
    INSERT_SELECT_BULK_DEPT_CLEARANCE_REQUIREMENT,
    GET_STUDENT_DEPT_CLEARANCE_RECORD_BY_FILTER,
    UPDATE_STUDENT_DEPT_CLEARANCE_RECORD_BY_ID
}