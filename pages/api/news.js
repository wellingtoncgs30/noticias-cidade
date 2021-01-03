import nodemailer from "nodemailer"
require("dotenv").config()

export default function(request, response) {
    if(request.method === "POST") {
        const mailer = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.PASSWORD
            }
        })
        mailer.sendMail(
            {
                from: [request.body.email]
            },
            function(error) {
                if(error) {
                    return response.status(500).send(error)
                }
                response.status(200)
                response.redirect("http://localhost:3000")
            }
        )
    }
}