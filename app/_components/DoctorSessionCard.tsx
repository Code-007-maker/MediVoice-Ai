"use client";
import { useState } from "react";
import axios from "axios";

export default function DoctorSessionCard({ session }: any) {
  const access = JSON.parse(localStorage.getItem("doctorAccess")!);
  const [note, setNote] = useState("");

  const submit = async () => {
    await axios.post("/api/doctor/add-note", {
      sessionChartId: session.id,
      doctorName: access.doctorName,
      doctorEmail: access.doctorEmail,
      note,
    });
    setNote("");
    alert("Note added");
  };

  return (
    <div className="border p-4 rounded-xl space-y-2">
      <p><b>Session:</b> {session.sessionId}</p>
      <p><b>Report:</b></p>
      <pre className="bg-gray-100 p-2 rounded text-sm">
        {JSON.stringify(session.report, null, 2)}
      </pre>

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Doctor note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Add Note
      </button>
    </div>
  );
}
