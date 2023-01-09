const express = require('express')
const mongoose = require('mongoose')

const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')

const app = express()
const db = process.env.MONGODB_ATLAS_CONNECTION_STRING
const port = process.env.APP_PORT

app.use(bodyParser.json())

const connectDB = async () => {
	try {
		await mongoose.set('strictQuery', false)
		await mongoose.connect(db)
		console.log('Connection to database successful!')
		app.listen(port)
		console.log(`App is running at port: ${port}`)
	} catch (err) {
		console.log('Connection to database failed!' + err)
	}
}

connectDB()
