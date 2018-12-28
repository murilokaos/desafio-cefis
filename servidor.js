const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
    res.sendFile('index.html');
})

app.listen(porta, () => {
    console.log(`O servidor está rodando na porta ${NODE_ENV.port}.`)
})
