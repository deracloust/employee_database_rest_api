const express = require('express')

const router = express.Router()

const isAuth = require('../middleware/auth')
const mainController = require('../controllers/main')

router.get('/employees', isAuth, mainController.getEmployees)

router.get('/employees/:id', mainController.getEmployee)

router.post('/employees', mainController.createEmployee)

router.put('/employees/:id', mainController.modifyEntireEmployee)

router.patch('/employees/:id', mainController.modfiyEmployee)

router.delete('/employees/:id', mainController.deleteEmployee)

module.exports = router
