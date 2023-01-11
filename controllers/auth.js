const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Admin = require('../models/admin')

exports.singup = async (req, res, next) => {
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
			res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				message: 'Employee search unsuccessful!',
			})
		}
	}
}

exports.login = async (req, res, next) => {}
