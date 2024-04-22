import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// cretae nodemailer transporter 
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.SMTP_KEY,
    }
});


// create send email function 
export const sendEmail = async(to,subject, msg)=>{
    const mailOption = {
        from: process.env.EMAIL_FROM,
        to: to,
        subject: subject,
        text: msg,
        html:` <body>
            <h3>${subject}</h3>
            <P>${msg}</P>
            <b>Fragrancehub mgt.</b>
        </body>`
    }
   

    try {
        await transporter.sendMail(mailOption)
        console.log(`Email sent to ${to}`);
    } catch (err) {
        console.log("Error sending Email", err.messge);
    }
}




// send the email using the transporter