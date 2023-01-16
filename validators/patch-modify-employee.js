const { checkSchema } = require('express-validator')

const employeeSchema = checkSchema({
	path: {
		exists: { errorMessage: 'Enter employee property you want to edit!' },
		isString: { errorMessage: 'Path must be string!' },
	},
	value: {
		exists: { errorMessage: 'Enter new value of editing property!' },
	},
})

module.exports = employeeSchema
