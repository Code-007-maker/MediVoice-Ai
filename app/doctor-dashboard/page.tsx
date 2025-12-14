"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DoctorNavbar from "../_components/DoctorNavbar";
import DoctorHistoryTable from "./_components/DoctorHistoryTable";

export type DoctorSession = {
  id: number;
  sessionId: string;
  notes: string;
  report: any;
  createdOn: string;
  SelectedDoctor: any;
};

type DoctorAccess = {
  doctorName: string;
  doctorEmail: string;
  patientEmail: string;
  expiresAt: string;
};

export default function DoctorDashboard() {
  const router = useRouter();

  // ✅ ALL hooks at top
  const [access, setAccess] = useState<DoctorAccess | null>(null);
  const [sessions, setSessions] = useState<DoctorSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("doctorAccess");

    // 1️⃣ no data
    if (!stored || stored === "null") {
      localStorage.removeItem("doctorAccess");
      router.push("/doctor-login");
      return;
    }

    let parsed: DoctorAccess | null = null;

    // 2️⃣ safe JSON parse
    try {
      parsed = JSON.parse(stored);
    } catch {
      localStorage.removeItem("doctorAccess");
      router.push("/doctor-login");
      return;
    }

    // 3️⃣ required fields check
    if (
      !parsed ||
      !parsed.patientEmail ||
      !parsed.expiresAt
    ) {
      localStorage.removeItem("doctorAccess");
      router.push("/doctor-login");
      return;
    }

    // 4️⃣ expiry check
    if (Date.now() > new Date(parsed.expiresAt).getTime()) {
      localStorage.removeItem("doctorAccess");
      router.push("/doctor-login");
      return;
    }

    setAccess(parsed);

    axios
      .post("/api/doctor/patient-sessions", {
        patientEmail: parsed.patientEmail,
      })
      .then((res) => setSessions(res.data))
      .finally(() => setLoading(false));
  }, []);

  // ✅ render after hooks
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading doctor dashboard...
      </div>
    );
  }

  if (!access) return null;

  return (
    <>
      <DoctorNavbar />
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">
          Patient Consultation History
        </h2>

        <DoctorHistoryTable historyList={sessions} />
      </div>
    </>
  );
}
