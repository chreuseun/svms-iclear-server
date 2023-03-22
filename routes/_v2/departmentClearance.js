const express = require('express')

const {ROUTERS} = require('../../config/routers')
const departmentClearanceRouter =express.Router()
const {addOneDepartmentClearanceRequirementRecord,getDepartmentClearanceRecord} = require('../../handlers/departmentClearance')

departmentClearanceRouter.get('/', getDepartmentClearanceRecord)

departmentClearanceRouter.post('/add-one-record', addOneDepartmentClearanceRequirementRecord)

const appUseDepartmentClearanceRouter = express().use(ROUTERS.departmentClearance, departmentClearanceRouter)

module.exports = appUseDepartmentClearanceRouter
