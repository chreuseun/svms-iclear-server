const express = require('express')
const { ROUTERS } = require('../../config/routers')
const { getAllAcademicYears, addOneAcademicYear, updateOneAcademicYear, getActiveAcademicYear } = require('../../handlers/academicYears')
const academicYearsRouter = express.Router()

// # GET
academicYearsRouter.get('', getAllAcademicYears)
academicYearsRouter.get('/active-academic-year', getActiveAcademicYear)

// # POST 
academicYearsRouter.post('/add', addOneAcademicYear)
academicYearsRouter.post('/update', updateOneAcademicYear)

const appUseAcademicYears = express().use( ROUTERS.academicYears, academicYearsRouter )

module.exports = appUseAcademicYears
