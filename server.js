const next = require("next")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")
const morgan = require("morgan")
require("dotenv").config()
const dev = process.env.NODE_ENV !== "production"
const port = 3000
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare(bodyParser.urlencoded({extended: true}))
    .then(() => {
        const server = express()
        server.use(bodyParser.urlencoded({extended: true}))
        server.use(morgan("dev"))
        server.use(cors())
        const mailer = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.PASSWORD
            }
        })
        server.post("/news", function(request, response) {
            mailer.sendMail(
                {
                    from: [request.body.email],
                    replyTo: [request.body.email],
                    to: [process.env.EMAIL_ADDRESS],
                    subject: "Recebimento de novas notícias e serviços",
                    html: "Seja muito bem-vindo ao Notícias Cidade. É um prazer contar com você. Você assinou o recebimento de novas notícias e novidades do Notícias Cidade"
                },
                function(error) {
                    if(error) {
                        return response.status(500).send(error)
                    }
                    response.status(200)
                    response.redirect("http://localhost:3000")
                }
            )
        })
        server.get("*", (request, response) => {
            return handle(request, response)
        })
        server.listen(port, (error) => {
            if(error) {
                throw error
            }
            console.log("servidor em execução".toUpperCase())
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })