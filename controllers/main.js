const express = require('express')
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')

const Employee = require('../models/employee')

exports.getEmployees = async (req, res, next) => {
	try {
		const employees = await Employee.find()
		res.status(200).json(employees)
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			return res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				errorMessage: 'Employees search unsuccessful!',
			})
		}
	}
}

exports.getEmployee = async (req, res, next) => {
	const employeeId = req.params.id

	if (!mongoose.isValidObjectId(employeeId)) {
		return res.status(422).json({
			errorStatus: 422,
			errorMessage: 'Enter a valid ObjectID!',
		})
	}

	try {
		const employee = await Employee.findById(employeeId)

		if (!employee) {
			return res.status(404).json({
				errorStatus: 404,
				errorMessage: `Employee '${employeeId.toString()}' not found in database!`,
			})
		}

		return res.status(200).json({
			message: 'Employee found!',
			employee: employee,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			return res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				errorMessage: 'Employee search unsuccessful!',
			})
		}
	}
}

exports.createEmployee = async (req, res, next) => {
	const token = req.get('Authorization')
	const decodedToken = jwt.decode(token)

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
		details: {
			createdBy: decodedToken.adminId,
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
			errorMessage: 'Employee with fallowing e-mail already exists!',
		})
	} catch (err) {
		console.log(err)
		if (!err.statusCode) {
			err.statusCode = 500
			return res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				errorMessage: 'Creating employee failed!',
			})
		}
	}
}

exports.modfiyEmployee = async (req, res, next) => {
	const employeeId = req.params.id
	const path = req.body.path
	const value = req.body.value
	const token = req.get('Authorization')
	const decodedToken = jwt.decode(token)

	if (!mongoose.isValidObjectId(employeeId)) {
		return res.status(422).json({
			errorStatus: 422,
			errorMessage: 'Enter a valid ObjectID!',
		})
	}

	try {
		const employee = await Employee.findById(employeeId)

		if (!employee) {
			return res.status(404).json({
				errorStatus: 404,
				errorMessage: `Employee '${employeeId.toString()}' not found in database! Can not update the employee data!`,
			})
		}

		if (!employee[path]) {
			return res.status(422).json({
				errorStatus: 422,
				errorMessage: `Entered employee propery not found! Make sure to enter property that exists!`,
			})
		}

		employee[path] = value
		employee.details.lastModyfiedBy = decodedToken.adminId
		await employee.save()

		return res
			.status(200)
			.json({
				message: `Propery '${path}' of employee ${employeeId} updated successfully! New value: ${employee[path]}`,
			})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			return res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				errorMessage: 'Update employee data failed! Make sure you entered validate value of updated data!',
			})
		}
	}
}

exports.modifyEntireEmployee = async (req, res, next) => {
	const employeeId = req.params.id
	const token = req.get('Authorization')
	const decodedToken = jwt.decode(token)

	if (!mongoose.isValidObjectId(employeeId)) {
		return res.status(422).json({
			errorStatus: 422,
			errorMessage: 'Enter a valid ObjectID!',
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
				details: {
					createdBy: decodedToken.adminId,
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
					errorMessage: `Employee '${employeeId.toString()}' not found in database! An attempt was made to create, but employee with fallowing e-mail already exists!`,
				})
			} catch (err) {
				if (!err.statusCode) {
					err.statusCode = 500
					return res.status(err.statusCode).json({
						errorStatus: err.statusCode,
						errorMessage: `Employee '${employeeId.toString()}' not found in database! Creating new employee failed!`,
					})
				}
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
		employee.details.lastModyfiedBy = decodedToken.adminId

		await employee.save()

		return res.status(200).json({
			message: 'Employee updated!',
			employee: employee,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			return res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				errorMessage:
					'Modyfing employee failed! You picked PUT method, so you need to send all data for the updated employee object. If you want to update specific data, use PATCH method.',
			})
		}
	}
}

exports.deleteEmployee = async (req, res, next) => {
	const employeeId = req.params.id

	if (!mongoose.isValidObjectId(employeeId)) {
		return res.status(422).json({
			errorStatus: 422,
			errorMessage: 'Enter a valid ObjectID!',
		})
	}

	try {
		const employee = await Employee.findById(employeeId)

		if (!employee) {
			return res.status(404).json({
				errorStatus: 404,
				errorMessage: `Employee '${employeeId.toString()}' not found in database! Can not delete employee!`,
			})
		}

		await employee.delete()

		return res.status(200).json({ message: `Employee '${employeeId}' deleted successfully!` })
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
			return res.status(err.statusCode).json({
				errorStatus: err.statusCode,
				errorMessage: 'Deleting employee failed!',
			})
		}
	}
}
