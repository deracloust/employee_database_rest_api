const express = require('express')

const router = express.Router()

const mainController = require('../controllers/main')

// Routes
router.get('/employees', mainController.getEmployees)

module.exports = router
