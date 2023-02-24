const express = require('express')
const { ROUTERS } = require('../../config/routers')
const { getAllAcademicYears, addOneAcademicYear } = require('../../handlers/academicYears')
const academicYearsRouter = express.Router()

// # GET
academicYearsRouter.get('', getAllAcademicYears)

// # POST 
academicYearsRouter.post('/add', addOneAcademicYear)

const appUseAcademicYears = express().use( ROUTERS.academicYears, academicYearsRouter )

module.exports = appUseAcademicYears
