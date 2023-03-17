const express = require('express')
const {
    addAccount,
    getAccountsByFilters,
    getAccountAuthorization
} = require('../../handlers/account')
const {ROUTERS} = require('../../config/routers')
const accountRouter =express.Router()

accountRouter.post('/add',addAccount)
accountRouter.get('/accounts',getAccountsByFilters)
accountRouter.get('/get-authorization',getAccountAuthorization)


const appUseAccountRouter = express().use(ROUTERS.account, accountRouter)

module.exports = appUseAccountRouter
