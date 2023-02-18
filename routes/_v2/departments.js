const express = require('express')

const {ROUTERS} = require('../../config/routers')
const { getDepartmentTypes, addOneDepartment } = require('../../handlers/department')
const departmentsRouter =express.Router()


// GET METHODS
departmentsRouter.get('/types', getDepartmentTypes)

// POST METHODS
departmentsRouter.post('/add', addOneDepartment)

const appUseDepartmentsRouter = express().use(ROUTERS.departments, departmentsRouter)

module.exports = appUseDepartmentsRouter
