const express = require('express')
const { default: mongoose } = require('mongoose')

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
				message: 'Employees search unsuccessful!',
			})
		}
		next()
	}
}

exports.getEmployee = async (req, res, next) => {
	const employeeId = req.params.id

	if (!mongoose.isValidObjectId(employeeId)) {
		return res.status(404).json({
			errorStatus: 404,
			message: 'Enter a valid ObjectID!',
		})
	}

	try {
		const employee = await Employee.findById(employeeId)

		if (!employee) {
			return res.status(404).json({
				errorStatus: 404,
				message: `Employee '${employeeId.toString()}' not found in database!`,
			})
		}

		return res.status(200).json({
			message: 'Employee found!',
			employee: employee,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				message: 'Employee search unsuccessful!',
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
			apartamentNumber: req.body.address.apartamentNumber,
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

exports.modfiyEmployee = async (req, res, next) => {
	const employeeId = req.params.id
	const path = req.body.path
	const value = req.body.value

	if (!mongoose.isValidObjectId(employeeId)) {
		return res.status(404).json({
			errorStatus: 404,
			message: 'Enter a valid ObjectID!',
		})
	}

	try {
		const employee = await Employee.findById(employeeId)

		if (!employee) {
			return res.status(404).json({
				errorStatus: 404,
				message: `Employee '${employeeId.toString()}' not found in database! Can not update the employee data!`,
			})
		}

		if (!employee[path]) {
			return res.status(404).json({
				errorStatus: 404,
				message: `Entered employee propery not found! Make sure to enter property that exists!`,
			})
		}

		employee[path] = value
		await employee.save()

		return res
			.status(200)
			.json({ message: `Propery '${path}' of employee ${employeeId} updated successfully! New value: ${value}` })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				message: 'Update employee data failed!',
			})
		}
		next()
	}
}

exports.modifyEntireEmployee = async (req, res, next) => {
	const employeeId = req.params.id

	if (!mongoose.isValidObjectId(employeeId)) {
		return res.status(404).json({
			errorStatus: 404,
			message: 'Enter a valid ObjectID!',
		})
	}

	try {
		const employee = await Employee.findById(employeeId)

		if (!employee) {
			const employee = new Employee({
				_id: mongoose.Types.ObjectId(employeeId),
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
					apartamentNumber: req.body.address.apartamentNumber,
					zipCode: req.body.address.zipCode,
					city: req.body.address.city,
				},
			})

			try {
				const employeeCheck = await Employee.findOne({ email: req.body.email })

				if (!employeeCheck) {
					await employee.save()
					return res.status(201).json({
						message: 'Employee with fallowing id not found! Created a new employee!',
						employeeId: employee._id.toString(),
					})
				}

				return res.status(403).json({
					errorStatus: 403,
					message: `Employee '${employeeId.toString()}' not found in database! An attempt was made to create, but employee with fallowing e-mail already exists!`,
				})
			} catch (err) {
				if (!err.statusCode) {
					err.statusCode = 500
					res.status(err.statusCode).json({
						errorStatus: err.statusCode,
						message: `Employee '${employeeId.toString()}' not found in database! Creating new employee failed!`,
					})
				}
				next()
			}
		}

		employee.firstName = req.body.firstName
		employee.lastName = req.body.lastName
		employee.email = req.body.email
		employee.position = req.body.position
		employee.dateOfHire = req.body.dateOfHire
		employee.department = req.body.department
		employee.dateOfBirth = req.body.dateOfBirth
		employee.address.streetName = req.body.address.streetName
		employee.address.buildingNumber = req.body.address.buildingNumber
		employee.address.apartamentNumber = req.body.address.apartamentNumber
		employee.address.zipCode = req.body.address.zipCode
		employee.address.city = req.body.address.city

		await employee.save()

		return res.status(200).json({
			message: 'Employee updated!',
			employee: employee,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				message:
					'Modyfing employee failed! You picked PUT method, so you need to send all data for the updated employee object. If you want to update specific data, use PATCH method.',
			})
		}
		next()
	}
}
