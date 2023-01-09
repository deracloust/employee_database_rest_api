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

exports.createEmployee = async (req, res, next) => {
	const employee = new Employee({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		position: req.body.position,
		dateOfHire: req.body.dateOfHire,
		department: req.body.department,
		dateOfBirth: req.body.dateOfBirth,
		address: {
			streetName: req.body.address.streetName,
			buildingNumber: req.body.address.buildingNumber,
			aparatamentNumber: req.body.address.aparatamentNumber || null,
			zipCode: req.body.address.zipCode,
			city: req.body.address.city,
		},
	})

	try {
		const employeeCheck = await Employee.findOne({ email: req.body.email })

		if (!employeeCheck) {
			await employee.save()
			return res.status(201).json({
				message: 'Employee created successfully!',
				employeeId: employee._id.toString(),
			})
		}

		return res.status(403).json({
			errorStatus: 403,
			message: 'Employee with fallowing e-mail already exists!',
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				message: 'Creating employee failed!',
			})
		}
		next()
	}
}
