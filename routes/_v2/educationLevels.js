const express = require('express')
const { ROUTERS } = require('../../config/routers')
const { getActiveEducationLevels ,getEducationLevelsPerCourse} = require('../../handlers/educationLevel')
const educationLevelsRouter =express.Router()

educationLevelsRouter.get('', getActiveEducationLevels)
educationLevelsRouter.get('/course_with_yearlevel', getEducationLevelsPerCourse)

const appUseEducationLevels = express().use(ROUTERS.educationLevels, educationLevelsRouter)

module.exports = appUseEducationLevels
