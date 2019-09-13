const express = require('express')
const app = express()
const morgan = require('morgan')

const Port = 3008
app.use(morgan('short'));
app.use(express.static('public'))

app.listen(Port, () => {
    console.log('Server is up and running on port ' + Port)
})


app.get('/', (req, res) => {
    res.render('index.html')
})