const express = require("express")
const config = require("config")
const nodemailer = require('nodemailer')
require('dotenv').config();


const mongoose = require('mongoose')
const registeredUsers = require('./models/registeredUsers')

var cors = require('cors');
const registeredusers = require("./models/registeredUsers");
const PORT = config.get('port') || 5000

const app = express()
app.use(cors())
app.use(express.json())







app.post('/api/sendmail',async (req,res)=>{
  if(!req.body.userName || !req.body.email) return res.sendStatus(400)
  res.send(`${req.body.email}`)
  console.log(req.body)

//mail
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure:true,
    auth: {
        user: '*****',
        pass: '*****'
    }
  })

  let result = transporter.sendMail({
    from: '<alt_ernative8@mail.ru>',
    to: req.body.email,
    subject: 'Successful registration',
    text: '',
    html:
      `<h1>Dear ${req.body.userName}!</h1><br><br><strong>
      We look forward to welcoming you to the event <strong>${req.body.eventName}</strong>,
       which will take place on <strong>${req.body.eventDate}</strong>. </strong><br><br><br><br>With love, team 
      <strong>ALTERNATIVE</strong> <div>xxx`,
  })
  if(result)console.log(`Message sent  to ${req.body.email}!`)

  ////
  const newUsers = new registeredusers({
    userName: req.body.userName,
    email: req.body.email,
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
  })
  await newUsers.save()

})


async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'),{
      useNewUrlParser:true,
      useUnifiedTopology:true,
    })
    app.listen(PORT, () => console.log(`App has been started at port ${PORT}`))
  
} catch (e) {
    console.log("Server error", e.message)
    process.exit(1)
  }
}

start()
