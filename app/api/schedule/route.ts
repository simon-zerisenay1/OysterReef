// pages/api/schedule-meeting.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(req: Request, res: Response) {
  const data = await req.json();

  try {
    const { email, date, name } = data;

    // Validate input
    if (!email || !date) {
      throw new Error('Email and date are required.');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: "oysterreefs@gmail.com",
        pass: process.env.Email_Password,
      },
    });

    const mailOptions = {
      from: {
        name: 'Oyster-Reefs', 
        address: email, 
      },
      to: '"Oyster Reefs" <info@frc.ae>',
      subject: 'New Meeting Scheduled',
      text: `A new meeting  schedule has been requested by .\n\nEmail: ${email}\nDate: ${new Date(date).toLocaleString()}`,
    };

    const info = await transporter.sendMail(mailOptions);

    if (info.response) {
      console.log('Email Sent:', info.response);
      return new Response(JSON.stringify({ message: 'Meeting scheduled successfully!' }), {
        status: 200,
      });
    } else {
      console.error('Error sending email');
      return new Response(JSON.stringify({ message: 'Failed to schedule meeting!' }), {
        status: 500,
      });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error scheduling meeting!' }), {
      status: 500,
    });
  }
}
