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

module.exports = {
    INSERT_ONE_ACCOUNT
}