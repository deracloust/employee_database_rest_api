const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
	const valResult = validationResult(req)

	if (!valResult.isEmpty()) {
		return res.status(422).json({
			errorStatus: 422,
			errorMessage: 'Body of the request contains invalid data!',
			invalidData: valResult.errors[0].param,
			description: valResult.errors[0].msg,
		})
	}

	next()
}
