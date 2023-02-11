const express = require('express')

const { ROUTERS } = require('../../config/routers')
const {getCourses} = require('../../handlers/courses')
const coursesRouter = express.Router()

coursesRouter.get( '', getCourses )

const appUseCoursesRouter = express().use(ROUTERS.courses, coursesRouter)

module.exports = appUseCoursesRouter