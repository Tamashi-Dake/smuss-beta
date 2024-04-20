import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request, response: Response) {
  try {
    const { email, message } = await request.json();
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      // Configure your email provider here
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      // temporary turn off rejectUnauthorized
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Define the email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: "New Contact Form Submission",
      text: `Email: ${email}\nMessage: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
