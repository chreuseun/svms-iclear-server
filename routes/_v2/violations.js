const express = require('express')
const { ROUTERS } = require('../../config/routers')
const { insertOneV2Violation } = require('../../handlers/violations')
const violationsRouter = express.Router()
const routeName = ROUTERS.violations

violationsRouter.post('/add', insertOneV2Violation)

const appUseAcademicYears = express().use( routeName, violationsRouter )

module.exports = appUseAcademicYears
