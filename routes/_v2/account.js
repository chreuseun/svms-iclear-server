const express = require('express')
const {
    addAccount,
    getAccountsByFilters
} = require('../../handlers/account')
const {ROUTERS} = require('../../config/routers')
const accountRouter =express.Router()

accountRouter.post('/add',addAccount)
accountRouter.get('/accounts',getAccountsByFilters)

const appUseAccountRouter = express().use(ROUTERS.account, accountRouter)

module.exports = appUseAccountRouter
