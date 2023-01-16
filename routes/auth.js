const express = require('express')
const { body } = require('express-validator')

const router = express.Router()

const authController = require('../controllers/auth')
const validation = require('../middleware/validation-result')

router.post(
	'/signup',
	[
		body('login').trim().isLength({ min: 5 }).withMessage('Enter login with atleast 5 characters!'),
		body('password').trim().isLength({ min: 6 }).withMessage('Enter password with atleast 6 characters!'),
	],
	validation,
	authController.singup
)

router.post('/login', authController.login)

module.exports = router
