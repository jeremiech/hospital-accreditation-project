import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "jeremiech06@gmail.com",
      pass: "ysbh qkey ijrw tyin",
    },
    // tls: { rejectUnauthorized: false },
  });

  export async function send(email:string, message:string ) {
  const mailOptions = {
    from: "Kacyiru Pubic Hospital (KPH)",
    to: email,
    subject: "Kacyiru Pubic Hospital (KPH)",
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.error(e);
  }
}