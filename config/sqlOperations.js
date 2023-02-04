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


module.exports = {
    INSERT_ONE_ACCOUNT,
    SELECT_USERS_BY_FILTER_NO_DATES,
    SELECT_USERS_BY_FILTER_WITH_DATES
}