import nodemailer from "nodemailer";
import { env } from "@config/env";
import { z } from "zod";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const SendEmailSchema = z.object({
  recipient: z.email({ error: "Invalid Recipient's email address" }),
  subject: z.string().min(1),
  html: z.string(),
});
type SendEmailDto = z.infer<typeof SendEmailSchema>;

export class EmailService {
  static EMAIL_TRANSPORT: SMTPTransport.Options = {
    host: env.NODEMAILER_HOST,
    port: env.NODEMAILER_PORT,
    secure: env.NODEMAILER_PORT === 465,
    auth: {
      user: env.NODEMAILER_USER,
      pass: env.NODEMAILER_PASS,
    },
  };

  static sendEmail = async (data: SendEmailDto) => {
    const transporter = nodemailer.createTransport(this.EMAIL_TRANSPORT);
    try {
      await transporter.sendMail({
        from: "CampusX OTP <otp.campusxapp@campusxapp.in>",
        to: data.recipient,
        subject: data.subject,
        html: data.html,
      });
    } catch (error) {
      // TODO: See what is possible when mail doesn't get transferred
      console.log(error);
    }
  };
}
