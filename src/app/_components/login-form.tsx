// components/login-form.tsx
"use client";

import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { sendOtpAction } from "../action";
import { getCaptchaToken } from "../../utils/captcha";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  // const [phone, setPhone] = useState("");
  const [phone, setPhone] = useState(() => "");
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!phone) {
      toast.error("Please enter a phone number");
      return;
    }

    const loadingToast = toast.loading("Verifying... ");
    const token = await getCaptchaToken();
    console.log({ token });

    const res = await sendOtpAction(token, phone);
    toast.dismiss(loadingToast);

    if (res.success) {
      toast.success(res.message);
      router.push("/dashboard");
    } else {
      toast.error(res.message);
    }
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
      <button
        type="submit"
        className="text-lg w-full bg-blue-800 text-white rounded-md p-2.5"
      >
        Send OTP
      </button>
    </form>
  );
}
