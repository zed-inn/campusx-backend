import { v4 as uuidv4 } from "uuid";
import client from "@config/cache";
import { BUSINESS } from "@config/constants/business";
import { EmailService } from "@shared/services/email.service";
import { AuthErrors } from "../auth.errors";
import { OtpVerifyDto } from "./dtos/otp-verify.dto";
import { OTP, OTP_TOKEN } from "./otp.constants";

export class OtpService {
  static generateOtp = (): string => {
    return `${uuidv4()}${uuidv4}`
      .replaceAll(/[A-Za-z]/g, "")
      .replaceAll("-", "")
      .substring(0, OTP.LENGTH);
  };

  static sendOtp = async (email: string) => {
    const otp = this.generateOtp();
    const subject = `${otp} is your OTP to verify your email address`;
    const html = `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px;">
      <h2 style="color: #4CAF50; text-align: center;">${BUSINESS.NAME} Verification</h2>
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">Your One-Time Password (OTP) for email verification is:</p>
      <div style="background: #f4f4f4; padding: 10px; text-align: center; border-radius: 5px; margin: 20px 0;">
        <h1 style="color: #4CAF50; margin: 0;">${otp}</h1>
      </div>
      <p style="font-size: 16px;">Please use this OTP to complete your verification process. Do not share this OTP with anyone.</p>
      <p style="font-size: 16px;">If you did not request this OTP, please ignore this email.</p>
      <hr style="border: 1px solid #ddd;">
      <p style="font-size: 14px; color: #777; text-align: center;">&copy; 2025 ${BUSINESS.NAME}. All rights reserved.</p>
    </div>`;

    if (OTP.POLICY.REPLACEMENT)
      await client.setEx(`otp:${email}`, OTP.VALIDITY.MINUTES * 60, otp);
    else {
      let otpValue = await client.get(`otp:${email}`);
      if (otpValue)
        await client.setEx(
          `otp:${email}`,
          OTP.VALIDITY.MINUTES * 60,
          JSON.stringify([...JSON.parse(otpValue), otp])
        );
      else
        await client.setEx(
          `otp:${email}`,
          OTP.VALIDITY.MINUTES * 60,
          JSON.stringify([otp])
        );
    }

    await EmailService.sendEmail({ recipient: email, subject, html });
  };

  static verifyOtp = async (data: OtpVerifyDto) => {
    const key = `otp:${data.email}`;

    const otpStored = await client.get(key);
    if (!otpStored) throw AuthErrors.invalidOtp;
    if (OTP.POLICY.REPLACEMENT && data.otp !== otpStored)
      throw AuthErrors.invalidOtp;
    if (!OTP.POLICY.REPLACEMENT && !JSON.parse(otpStored).includes(data.otp))
      throw AuthErrors.invalidOtp;

    const otpToken = `${uuidv4()}:${data.otp}`;
    await client.setEx(otpToken, OTP_TOKEN.VALIDITY.MINUTES * 60, data.email);
    await client.del(key);

    return otpToken;
  };

  static getEmailFromOtpToken = async (otpToken: string) => {
    const email = await client.get(otpToken);
    if (!email) throw AuthErrors.unauthorized;
    return email;
  };
}
