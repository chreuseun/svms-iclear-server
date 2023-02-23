const express = require('express')

const {ROUTERS} = require('../../config/routers')
const { 
    getDepartmentTypes,
    addOneDepartment,
    getAllDepartmentsByFilter, 
    updateOneDepartment,
    getDepartmentsWithAccounts
} = require('../../handlers/department')
const departmentsRouter =express.Router()


// GET METHODS
departmentsRouter.get('/types', getDepartmentTypes)
departmentsRouter.get('/', getAllDepartmentsByFilter)
departmentsRouter.get('/accounts', getDepartmentsWithAccounts)

// POST METHODS
departmentsRouter.post('/add', addOneDepartment)
departmentsRouter.post('/update', updateOneDepartment)

const appUseDepartmentsRouter = express().use(ROUTERS.departments, departmentsRouter)

module.exports = appUseDepartmentsRouter
