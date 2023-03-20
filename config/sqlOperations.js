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
    dt.name as department_type_name

FROM v2_account_departments as v2ad
JOIN account AS a
	ON a.id = v2ad.account_id 
		AND a.id = ?
        AND v2ad.is_deleted = 0
JOIN v2_departments as v2d ON
	v2ad.v2_department_id = v2d.id
    AND v2d.is_active = 1
JOIN departments_type AS dt ON
    dt.id = v2d.department_type_id;
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
    GET_DEPARTMENT_LIST_BY_ACCOUNT_ID
}