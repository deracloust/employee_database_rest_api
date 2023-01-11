const express = require('express')

const router = express.Router()

const mainController = require('../controllers/main')

router.get('/employees', mainController.getEmployees)

router.get('/employees/:id', mainController.getEmployee)

router.post('/employees', mainController.createEmployee)

router.put('/employees/:id', mainController.modifyEntireEmployee)

router.patch('/employees/:id', mainController.modfiyEmployee)

router.delete('/employees/:id', mainController.deleteEmployee)

module.exports = router
