"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  async function handleLogout() {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.log("Log out error:", error);
      toast.error("Failed to logout");
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold">Logged in successfully!</h1>
      <button
        onClick={handleLogout}
        className="text-lg w-50 bg-green-600 text-white rounded-md p-2.5 font-semibold"
      >
        Log Out
      </button>
    </div>
  );
}
