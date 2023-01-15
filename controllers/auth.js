const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { validationResult } = require('express-validator')

const Admin = require('../models/admin')

exports.singup = async (req, res, next) => {
	const valResult = validationResult(req)

	if (!valResult.isEmpty()) {
		return res.status(422).json({
			errorMessage: 'You entered invalid data!',
			errorStatus: 422,
			invalidData: valResult.errors[0].param,
			description: valResult.errors[0].msg,
		})
	}

	const login = req.body.login
	const password = req.body.password

	try {
		const hashPassword = await bcrypt.hash(password, 15)
		const admin = new Admin({
			login: login,
			password: hashPassword,
		})

		const result = await admin.save()

		return res.status(201).json({ message: 'Admin created!', adminId: result._id })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			return res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				message: 'Creating admin failed!',
			})
		}
	}
}

exports.login = async (req, res, next) => {
	const login = req.body.login
	const password = req.body.password

	if (login === undefined || password === undefined) {
		return res.status(422).json({
			errorStatus: 422,
			message: `Enter login and password!`,
		})
	}

	try {
		const admin = await Admin.findOne({ login: login })

		if (!admin) {
			return res.status(422).json({
				errorStatus: 422,
				message: `Admin with login: '${login}' not found!`,
			})
		}

		const authenticated = await bcrypt.compare(password, admin.password)

		if (!authenticated) {
			return res.status(401).json({
				errorStatus: 401,
				message: 'Authentication failed! Enter correct password!',
			})
		}

		const token = jwt.sign({ login: login, adminId: admin._id.toString() }, 'SuperSecret!', {
			expiresIn: '1h',
		})
		return res.status(200).json({
			message: 'Authentication successfull!',
			adminId: admin._id,
			token: token,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			return res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				message: 'Loging in failed!',
			})
		}
	}
}
