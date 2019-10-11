const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const Port = 3008

app.use(morgan('short'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

app.listen(Port, () => {
    console.log('Server is up and running on port ' + Port)
})


app.get('/', (req, res) => {
    res.render('index.html')
})

app.post('/new_signup', (req, res, err) => {

    var name = req.body.fullName 
    var email = req.body.email
    var city = req.body.city

    console.log(name, email, city);

    if (err) {
        console.log('Error creating new user signup', err)
    }

    res.redirect('http://google.com');
    res.end()
})