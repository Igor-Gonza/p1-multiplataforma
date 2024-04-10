const express = require('express')
const app = express()
const handlebars = require('express-handlebars').engine
const bodyParser = require("body-parser")
const clientes = require("./models/Clientes")

app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/cadastrar", function (req, res) {
    res.render("cadastro")
})

app.post("/cadastrar", function (req, res) {
    clientes.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }).then(function () {
        console.log("Cadastro de cliente feito com  sucesso")
    }).catch(function (erro) {
        console.log("Erro: Cadastro de cliente não realizado" + erro)
    })
    res.redirect("/consultar");
})

app.get("/consultar", function (req, res) {
    clientes.findAll()
    .then(function (clientes) {
        res.render("consulta", { "clientes": clientes })
    }).catch(function (erro) {
        console.log("Deu ruim: " + erro)
        res.render("consulta")
    })
})

app.get("/editar/:id", function (req, res) {
    clientes.findAll({
        where: { id: req.params.id }
    }).then(function (cliente) {
        res.render("editar", { "cliente": cliente })
    }).catch(function (erro) {
        console.log("Deu ruim: " + erro)
        res.render("editar")
    })
})

app.post("/editar/:id", function (req, res) {
    clientes.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    },
    {
        where: { id: req.params.id }
    }).then(function () {
        res.redirect("/consultar")
    }).catch(function (erro) {
        console.log("Deu ruim: " + erro)
        res.redirect("/consultar")
    })
})

app.post("/deletar/:id", function (req, res) {
    clientes.destroy({
        where: { id: req.params.id }
    }).then(function () {
        res.redirect("/consultar")
    }).catch(function (erro) {
        console.log("Deu ruim: " + erro)
        res.redirect("/consultar")
    })
})

app.listen(8081, function () {
    console.log("Servidor ativo na porta 8081")
})