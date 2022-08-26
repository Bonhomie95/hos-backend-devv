import nodemailer from "nodemailer";



export const sendEmail = async (email: string, subject: string, text: string) => {
  try {
    const testAccount = {
      name: "",
      user: "",
      pass: "",
    }; // Fake account generated at https://ethereal.email/create. You can login with the credentials to view sent messages

    const inProd = false;
    const config = inProd
      ? {
          host: process.env.HOST,
          service: process.env.SERVICE,
          port: 587,
          secure: true,
          auth: {
            user: process.env.USER,
            pass: process.env.PASS,
          },
        }
      : {
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        };

    const transporter = nodemailer.createTransport(config);

    const mailInfo = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log(
      `email sent sucessfully to ${email}. Preview at ${nodemailer.getTestMessageUrl(
        mailInfo
      )}`
    );
  } catch (error) {
    console.log(error, "email not sent");
    throw error;
  }

  return true;
};

export const sendBulkEmail = async (emails:any, subject:string, text:string) => {
  try {
    const promises = [];
    for (const email of emails) {
      const promise = sendEmail(email, subject, text);
      promises.push(promise);
    }

    await Promise.all(promises);

    console.log(`emails sent sucessfully to ${emails}`);
  } catch (error) {
    console.log(error, "emails not sent");
    throw error;
  }

  return true;
};


export function SendInvite(to:any, from:any, link: any) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });
  let clientUrl = `https://invitation-system.thoseapp.com/invite/${from}-${link}`;
  var mailOptions = {
    from: "thoseapp@gmail.com",
    to: to,
    subject: "You have been Invited to join this organization",
    html: `<p> Your invitation link is: <a href='${clientUrl}'> ${clientUrl}</a>`
  };
  transporter.sendMail(mailOptions, function(error: any, info: { response: string; }) {
    if (error) {
      return console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}