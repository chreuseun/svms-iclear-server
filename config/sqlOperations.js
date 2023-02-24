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
    INSERT_ONE_ACADEMIC_YEAR
}