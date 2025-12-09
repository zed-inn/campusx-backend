import nodemailer from "nodemailer";
import { env } from "@config/env";
import { z } from "zod";

const SendEmailSchema = z.object({
  recipient: z.email({ error: "Invalid Recipient's email address" }),
  subject: z.string().min(1),
  html: z.string(),
});
type SendEmailDto = z.infer<typeof SendEmailSchema>;

export class EmailService {
  static EMAIL_TRANSPORT = {
    service: "gmail",
    auth: { user: env.GOOGLE_EMAIL, pass: env.GOOGLE_APP_PASSWORD },
  };

  static sendEmail = async (data: SendEmailDto) => {
    const transporter = nodemailer.createTransport(this.EMAIL_TRANSPORT);
    try {
      await transporter.sendMail({
        from: env.GOOGLE_EMAIL,
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
