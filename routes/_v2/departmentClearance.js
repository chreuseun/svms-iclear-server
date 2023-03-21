const express = require('express')

const {ROUTERS} = require('../../config/routers')
const departmentClearanceRouter =express.Router()
const {addOneDepartmentClearanceRequirementRecord} = require('../../handlers/departmentClearance')

departmentClearanceRouter.post('/add-one-record', addOneDepartmentClearanceRequirementRecord)

const appUseDepartmentClearanceRouter = express().use(ROUTERS.departmentClearance, departmentClearanceRouter)

module.exports = appUseDepartmentClearanceRouter
