const express = require('express')
const { ROUTERS } = require('../../config/routers')
const { getAllSemester } = require('../../handlers/semester')
const semesterRouter = express.Router()

semesterRouter.get('',getAllSemester)

const appUseSemesters = express().use( ROUTERS.semesters, semesterRouter )

module.exports = appUseSemesters
