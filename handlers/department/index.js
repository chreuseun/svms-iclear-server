const getDepartmentTypes = require('./getDepartmentTypes')
const addOneDepartment = require('./addOneDepartment')
const getAllDepartmentsByFilter = require('./getAllDepartmentsByFilter')
const updateOneDepartment = require('./updateOneDepartment')
const getDepartmentsWithAccounts = require('./getDepartmentsWithAccounts')
const deleteAccountToDepartment = require('./deleteAccountToDepartment')
const activateAccountToDepartment = require('./activateAccountToDepartment')

module.exports.getDepartmentTypes = getDepartmentTypes
module.exports.addOneDepartment = addOneDepartment
module.exports.getAllDepartmentsByFilter = getAllDepartmentsByFilter
module.exports.updateOneDepartment = updateOneDepartment
module.exports.getDepartmentsWithAccounts=getDepartmentsWithAccounts
module.exports.activateAccountToDepartment=activateAccountToDepartment
module.exports.deleteAccountToDepartment=deleteAccountToDepartment