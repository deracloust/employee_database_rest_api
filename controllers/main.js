const express = require('express')

const Employee = require('../models/employee')

exports.getEmployees = async (req, res, next) => {
	try {
		const employees = await Employee.find()
		res.status(200).json(employees)
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				message: 'Searching employees failed!',
			})
		}
		next()
	}
}
