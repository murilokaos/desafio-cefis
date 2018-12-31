const porta = process.env.PORT || 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
<<<<<<< HEAD
const path = require('path')

app.use(bodyParser.urlencoded({ extended: true}))

//app.use(express.static(path.join(__dirname, './public')));
=======

app.use(bodyParser.urlencoded({ extended: true}))
>>>>>>> hotfix
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
    res.send('#/pages/cursos.html');
})

app.listen(porta, () => {
    console.log(`O servidor está rodando na porta ${porta}.`)
})
