const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service : 'Gmail',
  auth: {
    user: "mynodeemailforlearning@gmail.com",
    pass: "chpatzkbfwgdchgj",
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

router.post("/", (req, res, next) => {
  const { firstName, lastName, password, email, receiver } = req.body;
  const mailData = {
    from: "mynodeemailforlearning@gmail.com",
    to: receiver,
    subject: 'practice sending email',
    text: 'Text',
    html: `<b>Hey there! </b><br> 
      First name is ${firstName} <br />
      Last name is ${lastName} <br />
      Password is ${password} <br />
      Email is ${email} <br />
    <br/>`,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
  res.status(200).redirect('/');
});

module.exports = router;
