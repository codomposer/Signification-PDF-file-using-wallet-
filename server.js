const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
var corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// parse requests of content-type - application/json
app.use(express.json())
app.use(bodyParser.json({ type: 'text/*' }))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// db connect
const db = require('./app/models')
db.sequelize.sync()

// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.')
// })

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Akileus application.' })
})

// require('./app/routes/tutorial.routes')(app)
require('./app/routes/sign.routes')(app)
require('./app/routes/auth.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
