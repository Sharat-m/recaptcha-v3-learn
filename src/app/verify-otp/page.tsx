"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function verifyOtp() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  async function handleVerifyOtp() {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const result = await window.confirmationResult.confirm(otp);
      console.log("OTP verified:", result);
      toast.success("OTP Verified!");
      router.push("/dashboard");
    } catch (error) {
      console.log("Verify OTP error", error);
      toast.error("Invalid OTP. Please try again");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h2 className="text-2xl font-semibold">Enter OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="p-2.5 text-lg w-80 rounded-md border border-gray-300"
      />
      <button
        onClick={handleVerifyOtp}
        className="text-lg w-80 bg-green-600 text-white rounded-md p-2.5"
      >
        verify OTP
      </button>
    </div>
  );
}
