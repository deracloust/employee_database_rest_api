const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
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
	City: {
		type: String,
		required: true,
	},
})

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
			type: addressSchema,
			required: true,
		},
	},
	{ timestamps: true }
)
