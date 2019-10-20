const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3008

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

app.listen(PORT, () => {
    console.log('Server is up and running on: ')
})

const pool = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b9bc95ae944364',
    password: '63d9d15b',
    database:'heroku_9ac93b6b6935406'
})

function connection() {
    return pool
}

app.get('/', (req, res) => {
    res.render('index.html')
})

app.post('/new_signup', (req, res, err) => {

    var device = null

    if (req.body.iOS) {
        console.log('user has iOS')
        device = 'iOS'
    } else if (req.body.Android) {
        console.log('user has Android')
        device = 'Android'
    }

    var name = req.body.fullName 
    var email = req.body.email
    var city = req.body.city
    
    console.log(name, email, city, device);

    const queryString = "INSERT INTO users (name, email, city, device) VALUES (?, ?, ?, ?)"

    connection.query(queryString, [name, email, city, device], (error, results, fields) => {
        if (error) {
            console.log("Failed to insert new user into mysql database" + error)
            res.sendStatus(500)
            return
        }

        console.log("Successfully inserted new user" + results.insertID)
        res.redirect('index.html');
        res.end()
    })
})