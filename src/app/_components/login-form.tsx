// components/login-form.tsx
"use client";

import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { sendOtpAction } from "../action";
import { getCaptchaToken } from "../../utils/captcha";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from "firebase/auth";

// Extend Window object to include recaptchaVerifier
declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

export function LoginForm() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!phone) {
      toast.error("Please enter a phone number");
      return;
    }

    const loadingToast = toast.loading("Verifying... ");
    const token = await getCaptchaToken();

    // Log phone number and token on the client side
    console.log("Phone Number:", phone);
    console.log("reCAPTCHA Token:", token);

    try {
      // Create reCAPTCHA verifier
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log("reCAPTCHA solved", response);
          },
        }
      );

      window.confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      console.log("OTP Sent Successfully", window.confirmationResult);
      toast.success("OTP Sent Successfully!");
      // router.push("/dashboard");
      router.push("/verify-otp");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP");
    }

    toast.dismiss(loadingToast);
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">Login with Phone</h2>
      <input
        type="tel"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2.5 text-lg w-full rounded-md border border-gray-300"
      />
      <div id="recaptcha-container"></div>
      <button
        type="submit"
        className="text-lg w-full bg-blue-800 text-white rounded-md p-2.5"
      >
        Send OTP
      </button>
    </form>
  );
}
