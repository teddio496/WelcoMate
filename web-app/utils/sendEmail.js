import nodemailer from 'nodemailer';

export default async function sendEmail(to, subject, loginUrl) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login to Your Hotel Account</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          h1 {
            font-size: 24px;
            color: #333333;
          }
          p {
            font-size: 16px;
            color: #666666;
            line-height: 1.6;
          }
          .login-button {
            display: inline-block;
            background-color: #1a73e8;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
          }
          .login-button:hover {
            background-color: #1557c5;
          }
          .footer {
            font-size: 14px;
            color: #999999;
            margin-top: 30px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>Welcome to Our Hotel!</h1>
          <p>
            Hi there, <br />
            Thank you for staying with us! To access your account and manage your
            stay, click the button below to securely log in.
          </p>
          <a href="http://${loginUrl}" class="login-button">Log In to Your Account</a>
          <p><a href=${loginUrl}">${loginUrl}</a></p>
        </div>
      </body>
    </html>
  `;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "welcomate@gmail.com",
      pass: "mxdnsxdjfjzagjbr",
    },
  });

  await transporter.sendMail({
    from: "WelcoMate <welcomate@gmail.com>",
    to,
    subject,
    html,
  });
}
