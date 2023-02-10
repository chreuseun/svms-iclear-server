const express = require('express')

const {ROUTERS} = require('../../config/routers')
const { getDepartmentTypes } = require('../../handlers/department')
const departmentsRouter =express.Router()

departmentsRouter.get('/types', getDepartmentTypes)

const appUseDepartmentsRouter = express().use(ROUTERS.departments, departmentsRouter)

module.exports = appUseDepartmentsRouter
