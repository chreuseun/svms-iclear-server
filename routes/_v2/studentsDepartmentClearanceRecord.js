const express = require('express')
const { ROUTERS } = require('../../config/routers')
const { insertSelectStudentsDepartmentClearanceRecord,getStudentDeptClearanceRecordByFilter } = require('../../handlers/studentsDepartmentClearanceRecord')
const studentDepartmentClearanceRecordRouter = express.Router()

studentDepartmentClearanceRecordRouter.get('/filtered-student-clearance', getStudentDeptClearanceRecordByFilter)

studentDepartmentClearanceRecordRouter.post('/bulk-insert-student-dept-clearance-record', insertSelectStudentsDepartmentClearanceRecord)

const appUseStudentDepartmentClearanceRecordRouter = express().use( ROUTERS.studentDepartmentClearanceRecord, studentDepartmentClearanceRecordRouter )

module.exports = appUseStudentDepartmentClearanceRecordRouter