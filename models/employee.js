const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			required: true,
		},
		dateOfHire: {
			type: Date,
			default: Date.now,
		},
		department: {
			type: String,
			required: true,
		},
		dateOfBirth: {
			type: Date,
			required: true,
		},
		address: {
			streetName: {
				type: String,
				required: true,
			},
			buildingNumber: {
				type: Number,
				required: true,
			},
			apartamentNumber: {
				type: Number,
				required: false,
			},
			zipCode: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Employee', employeeSchema)
