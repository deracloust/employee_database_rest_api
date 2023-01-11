const express = require('express')

const router = express.Router()

const isAuth = require('../middleware/auth')
const mainController = require('../controllers/main')

router.get('/employees', isAuth, mainController.getEmployees)

router.get('/employees/:id', isAuth, mainController.getEmployee)

router.post('/employees', isAuth, mainController.createEmployee)

router.put('/employees/:id', isAuth, mainController.modifyEntireEmployee)

router.patch('/employees/:id', isAuth, mainController.modfiyEmployee)

router.delete('/employees/:id', isAuth, mainController.deleteEmployee)

module.exports = router
