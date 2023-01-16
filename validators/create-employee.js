const { checkSchema } = require('express-validator')

const employeeSchema = checkSchema({
	firstName: {
		exists: { errorMessage: 'First name of the employee is required!' },
		isString: { errorMessage: 'First name of the employee must be string!' },
		trim: true,
	},
	lastName: {
		exists: { errorMessage: 'Last name of the employee is required!' },
		isString: { errorMessage: 'Last name of the employee must be string!' },
		trim: true,
	},
	email: {
		exists: { errorMessage: 'Email address is required!' },
		isEmail: { errorMessage: 'Please provide valid email' },
		normalizeEmail: true,
		trim: true,
	},
	position: {
		exists: { errorMessage: 'Position of the employee is required!' },
		isString: { errorMessage: 'Position of the employee must be string!' },
		trim: true,
	},
	department: {
		exists: { errorMessage: 'Department of the employee is required!' },
		isString: { errorMessage: 'Department of the employee must be string!' },
		trim: true,
	},
	dateOfBirth: {
		exists: { errorMessage: 'Date of birth of the employee is required!' },
		isString: { errorMessage: 'Date of birth of the employee must be string!' },
		isISO8601: { errorMessage: 'Date of birth should be entered in ISO8601 format (yyyy-mm-dd)' },
		trim: true,
	},
	dateOfHire: {
		isString: { errorMessage: 'Date of hire of the employee must be string!' },
		isISO8601: { errorMessage: 'Date of hire should be entered in ISO8601 format (yyyy-mm-dd)' },
		trim: true,
		optional: true,
	},
	address: {
		exists: { errorMessage: 'Address data of the employee is required!' },
	},
	'address.streetName': {
		exists: { errorMessage: 'Street name property of address data is required!' },
		isString: { errorMessage: 'Street name property of address data must be string!' },
		trim: true,
	},
	'address.buildingNumber': {
		exists: { errorMessage: 'Building number property of address data is required!' },
		isNumeric: { errorMessage: 'Building number property of address data must be number!' },
		trim: true,
	},
	'address.apartamentNumber': {
		isNumeric: { errorMessage: 'Apartament number property of address data must be number!' },
		trim: true,
		optional: true,
	},
	'address.zipCode': {
		exists: { errorMessage: 'Zip Code property of address data is required!' },
		isString: { errorMessage: 'Zip Code property of address data must be string!' },
		trim: true,
	},
	'address.city': {
		exists: { errorMessage: 'City property of address data is required!' },
		isString: { errorMessage: 'City property of address data must be string!' },
		trim: true,
	},
})

module.exports = employeeSchema
