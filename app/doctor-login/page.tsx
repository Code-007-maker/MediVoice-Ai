"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DoctorLoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<"FORM" | "OTP">("FORM");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    doctorName: "",
    doctorEmail: "",
    patientEmail: "",
  });

  const [otp, setOtp] = useState("");

  // STEP 1 → Send OTP
  const sendOtp = async () => {
    setLoading(true);
    try {
      await axios.post("/api/doctor/send-otp", form);
      localStorage.setItem("doctorMeta", JSON.stringify(form));
      setStep("OTP");
    } catch (err) {
      alert("Failed to send OTP");
      console.error(err)
    }
    setLoading(false);
  };

  // STEP 2 → Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/doctor/verify-otp", {
        doctorEmail: form.doctorEmail,
        patientEmail: form.patientEmail,
        otp,
      });

      localStorage.setItem(
        "doctorAccess",
        JSON.stringify({
          ...form,
          expiresAt: res.data.expiresAt,
        })
      );

      router.push("/doctor-dashboard");
    } catch (err) {
      alert("Invalid or expired OTP");
    }
    setLoading(false);
  };

return (
  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50">

    {/* LEFT INFO / IMAGE SECTION */}
    <div className="hidden lg:flex flex-col justify-center items-center px-10 bg-gradient-to-br from-green-700 to-indigo-200 text-white">
      <img
        src="https://healthexec.com/sites/default/files/2025-08/doctor_patient.jpg"
        alt="Doctor Illustration"
        className="w-3/4 max-w-md rounded-xl shadow-xl mb-8"
      />
      <h2 className="text-3xl font-bold mb-3 text-center">
        Secure Doctor Access
      </h2>
      <p className="text-center text-blue-100 max-w-md">
        Doctors can temporarily access patient reports using OTP-based
        verification. All access is logged and expires automatically for
        patient safety.
      </p>
    </div>

    {/* RIGHT LOGIN CARD */}
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">👨‍⚕️ Doctor Access</h2>
          <p className="text-gray-500 text-sm mt-1">
            Verify patient consent via OTP
          </p>
        </div>

        {/* STEP 1: FORM */}
        {step === "FORM" && (
          <div className="space-y-4">
            <input
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doctor Name"
              onChange={(e) =>
                setForm({ ...form, doctorName: e.target.value })
              }
            />

            <input
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doctor Email"
              type="email"
              onChange={(e) =>
                setForm({ ...form, doctorEmail: e.target.value })
              }
            />

            <input
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Patient Email"
              type="email"
              onChange={(e) =>
                setForm({ ...form, patientEmail: e.target.value })
              }
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2.5 rounded-lg font-medium"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* STEP 2: OTP */}
        {step === "OTP" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              OTP sent to <b>{form.patientEmail}</b>
            </p>

            <input
              className="w-full border rounded-lg px-4 py-2 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter 6-digit OTP"
              value={otp}
              maxLength={6}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2.5 rounded-lg font-medium"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => setStep("FORM")}
              className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Change details
            </button>
          </div>
        )}

        {/* FOOTER NOTE */}
        <p className="text-xs text-gray-400 text-center">
          Access is valid for 30 minutes and automatically expires.
        </p>
      </div>
    </div>
  </div>
);
}