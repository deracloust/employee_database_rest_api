const express = require('express')
const mongoose = require('mongoose')

const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')

const app = express()
const db = `mongodb://${process.env.ROOT_USERNAME}:${process.env.ROOT_PASSWORD}@${process.env.HOST_IP}:${process.env.DB_PORT}`
const port = process.env.APP_PORT

const authRoutes = require('./routes/auth')
const mainRoutes = require('./routes/main')

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
		return res.status(200).json({
			message: 'Allowed HTTP methods: GET, POST, PUT, PATCH, DELETE',
		})
	}

	next()
})

app.use('/', mainRoutes)
app.use('/auth', authRoutes)

app.use((req, res, next) => {
	return res.status(404).json({ message: 'NOT FOUND!' })
})

const startApp = async () => {
	try {
		mongoose.set('strictQuery', false)
		await mongoose.connect(db)
		console.log('Connection to database successful!')
		app.listen(port)
		console.log(`App is running at port: ${port}`)
	} catch (err) {
		console.log('Connection to database failed!' + err)
	}
}

startApp()
