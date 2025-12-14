"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type DoctorAccess = {
  doctorName: string;
  doctorEmail: string;
  patientEmail: string;
  expiresAt: string;
};

export default function DoctorNavbar() {
  const router = useRouter();

  const [access, setAccess] = useState<DoctorAccess | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0); // ⏱️ seconds

  useEffect(() => {
    const stored = localStorage.getItem("doctorAccess");
    if (!stored || stored === "null") {
      router.push("/doctor-login");
      return;
    }

    const parsed: DoctorAccess = JSON.parse(stored);
    setAccess(parsed);

    const expiryTime = new Date(parsed.expiresAt).getTime();

    // ⏱️ TIMER INTERVAL
    const interval = setInterval(() => {
      const diff = Math.floor((expiryTime - Date.now()) / 1000);

      if (diff <= 0) {
        clearInterval(interval);
        localStorage.removeItem("doctorAccess");
        router.push("/doctor-login");
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!access) return null;

  // ⏱️ format mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div>
        <h2 className="text-lg font-semibold">
          Dr. {access.doctorName}
        </h2>
        <p className="text-xs text-gray-500">
          Session expires in{" "}
          <span className="font-semibold text-red-600">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </span>
        </p>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          localStorage.removeItem("doctorAccess");
          router.push("/");
        }}
      >
        Logout
      </Button>
    </nav>
  );
}
