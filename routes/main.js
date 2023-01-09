const express = require('express')

const router = express.Router()

const mainController = require('../controllers/main')

router.get('/employees', mainController.getEmployees)

router.post('/employees', mainController.createEmployee)

module.exports = router
