const express = require('express')
const { ROUTERS } = require('../../config/routers')
const { bulkUpsertStudents } = require('../../handlers/students')
const studentRouter = express.Router()

// # POST 
studentRouter.post('/bulk-insert', bulkUpsertStudents)

const appUseStudent = express().use( ROUTERS.student, studentRouter)

module.exports = appUseStudent
