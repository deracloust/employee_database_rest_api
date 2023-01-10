const express = require('express')
const mongoose = require('mongoose')

const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')

const app = express()
const db = `mongodb://${process.env.ROOT_USERNAME}:${process.env.ROOT_PASSWORD}@${process.env.HOST_IP}:${process.env.DB_PORT}`
const port = process.env.APP_PORT

const mainRoutes = require('./routes/main')

app.use(bodyParser.json())
app.use(mainRoutes)

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
