"use server";

import { verifyCaptchaToken } from "../utils/captcha";

export async function sendOtpAction(token: string | null, phone: string) {
  console.log("phone number: ", phone);

  if (!token) {
    return {
      success: false,
      message: "Token not found",
    };
  }

  //verify the token

  const captchaData = await verifyCaptchaToken(token);

  if (!captchaData) {
    return {
      success: false,
      message: "Captcha failed",
    };
  }

  if (!captchaData.success || captchaData.score < 0.5) {
    return {
      success: false,
      message: "Captcha failed",
      errors: !captchaData.success ? captchaData["error-codes"] : undefined,
    };
  }
  // Do the things with form data

  return {
    success: true,
    message: "Message sent successfully",
  };
}
