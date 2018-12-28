const porta = process.env.port
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(porta, () => {
    console.log(`O servidor está rodando na porta ${porta}.`)
})