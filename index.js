const nodemailer = require('nodemailer')
const path = require("path")
const fs = require('fs')
let ejs = require('ejs');

let emails = ['emailPenerima@gmail.com']


const filePath = path.join(__dirname, '/email.html');
const source = fs.readFileSync(filePath, 'utf-8').toString();
const data = [
                {
                    nama: "yantok",
                    alamat : "sumedang"
                },
                {
                    nama: "ali",
                    alamat : "Jakarta"
                },
            ]

const html = ejs.render(source, {data});

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    host:'smtp.gmail.com',
    auth: {
        user: "emailPengirim@gmail.com",
        pass: 'password google app'
    }
})

let details = {
    from: 'emailPengirim@gmail.com',
    to: '',
    subject: 'Belajar Nodemailer',
    text: 'Text belajar nodemailer',
    attachments:[
        {filename: 'mongodb.png', path:'./mongodb.png'}
    ],
    html: html, 
}


let array = []
emails.forEach(item => {
    details.to = item
    const send = mailTransporter.sendMail(details);
    array.push(send) //pending / promise
    console.log('email terkirim')
})
Promise.all(array).then(res => console.log({res})).catch(err=>console.log({err}))
