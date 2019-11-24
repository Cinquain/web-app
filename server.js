const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const request = require('superagent')

const PORT = process.env.PORT || 3008

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

app.listen(PORT, () => {
    console.log('Server is up and running on 3008')
})

const pool = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b9bc95ae944364',
    password: '63d9d15b',
    database:'heroku_9ac93b6b6935406'
})

app.get('/', (req, res) => {
    res.render('index.html')
})


app.post('/new_signup', (req, res, err) => {

    var name = req.body.fullName 
    var email = req.body.email
    var city = req.body.city
    var device = req.body.deviceType
    
    console.log(name, email, city, device);
    saveToMailChimp(name, email, city, device);


    const queryString = "INSERT INTO users (name, email, city, device) VALUES (?, ?, ?, ?)"

    pool.query(queryString, [name, email, city, device], (error, results, fields) => {
        if (error) {
            console.log("Failed to insert new user into mysql database" + error)
            res.sendStatus(500)
            return
        }

        console.log("Successfully inserted new user" )

        res.redirect('index.html');
        res.end()
    })    
})


function saveToMailChimp(name, email, city, device) {

    var request = require('request');

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: name, 
                    TEXTYUI_3: city, 
                    CHECKBOXY: device
                }
            }
        ]
    }

    const postData = JSON.stringify(data)

    const options = { 
    url: 'https://us7.api.mailchimp.com/3.0/lists/cc06da0dc6',
    method: 'POST',
    headers: { 
        Authorization: 'auth 2d49af1f4e73a69ab208d07a27b5c768-us7'
    },
    body: postData 
    };

    request(options, function (error, response, body) {
    if (error) {
        console.log('Error saving to mailchimp')
    } else if (response.statusCode === 200) {
        console.log('Saved to mailchimp');
    }
    });
}

