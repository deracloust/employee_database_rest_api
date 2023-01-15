const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization')
	if (!authHeader) {
		return res.status(401).json({ errorStatus: 401, errorMessage: `Not authenticated!` })
	}

	let decodedToken

	try {
		decodedToken = jwt.verify(authHeader, 'SuperSecret!')
	} catch (err) {
		return res.status(401).json({ errorStatus: 401, errorMessage: `Not authenticated!` })
	}

	if (!decodedToken) {
		return res.status(401).json({ errorStatus: 401, errorMessage: `Not authenticated!` })
	}
	req.userId = decodedToken.userId
	next()
}
