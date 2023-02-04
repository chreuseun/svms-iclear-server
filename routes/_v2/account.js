const express = require('express')
const {addAccount} = require('../../handlers/account')
const {ROUTERS} = require('../../config/routers')
const accountRouter =express.Router()

accountRouter.post('/add',addAccount)

const appUseAccountRouter = express().use(ROUTERS.account, accountRouter)

module.exports = appUseAccountRouter
