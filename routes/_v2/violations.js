const express = require('express')
const { ROUTERS } = require('../../config/routers')
const { insertOneV2Violation,getAllV2Violations } = require('../../handlers/violations')
const violationsRouter = express.Router()
const routeName = ROUTERS.violations

// GET REQUEST
violationsRouter.get('/all', getAllV2Violations)

// POST REQUEST
violationsRouter.post('/add', insertOneV2Violation)

const appUseAcademicYears = express().use( routeName, violationsRouter )

module.exports = appUseAcademicYears
