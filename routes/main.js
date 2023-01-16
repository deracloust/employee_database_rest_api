const express = require('express')

const router = express.Router()

const isAuth = require('../middleware/auth')
const createEmployeeValidator = require('../validators/create-employee')
const putModfiyEmployeeValidator = require('../validators/put-modify-employee')
const patchModfiyEmployeeValidator = require('../validators/patch-modify-employee')
const validation = require('../middleware/validation-result')
const mainController = require('../controllers/main')

router.get('/employees', isAuth, mainController.getEmployees)

router.get('/employees/:id', isAuth, mainController.getEmployee)

router.post('/employees', isAuth, createEmployeeValidator, validation, mainController.createEmployee)

router.put('/employees/:id', isAuth, putModfiyEmployeeValidator, validation, mainController.modifyEntireEmployee)

router.patch('/employees/:id', isAuth, patchModfiyEmployeeValidator, validation, mainController.modfiyEmployee)

router.delete('/employees/:id', isAuth, mainController.deleteEmployee)

module.exports = router
