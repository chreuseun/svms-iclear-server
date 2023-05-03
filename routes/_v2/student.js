const express = require('express')
const { ROUTERS } = require('../../config/routers')
const { 
    bulkUpsertStudents,
    getAllStudentsByCriteria
} = require('../../handlers/students')
const studentRouter = express.Router()

// GET
studentRouter.get('/all', getAllStudentsByCriteria)

// # POST 
studentRouter.post('/bulk-insert', bulkUpsertStudents)

const appUseStudent = express().use( ROUTERS.student, studentRouter)

module.exports = appUseStudent
