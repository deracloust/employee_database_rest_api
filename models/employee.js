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
			default: Date.now(),
			required: true,
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
		details: {
			createdBy: {
				type: mongoose.Types.ObjectId,
				required: true,
			},
			lastModyfiedBy: {
				type: mongoose.Types.ObjectId,
				required: false,
			},
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Employee', employeeSchema)
