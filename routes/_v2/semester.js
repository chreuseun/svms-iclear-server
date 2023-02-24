const express = require('express')
const { ROUTERS } = require('../../config/routers')
const { getAllSemester,setActiveSemester } = require('../../handlers/semester')
const semesterRouter = express.Router()

// # GET
semesterRouter.get('', getAllSemester)

// # POST 
semesterRouter.post('/set', setActiveSemester)

const appUseSemesters = express().use( ROUTERS.semesters, semesterRouter )

module.exports = appUseSemesters
