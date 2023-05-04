const express = require('express')
const { STUDENT_ROUTER } = require('../../../config/routers')
const {initiateStudentLoginByUsername} = require('../../../handlers/subHandlers/students/accounts')

const studentAccountRouter = express.Router()

// # POST 
studentAccountRouter.post('/login', initiateStudentLoginByUsername)

const studentAccountRoutes = express().use( STUDENT_ROUTER.student_accounts, studentAccountRouter )

module.exports = studentAccountRoutes
