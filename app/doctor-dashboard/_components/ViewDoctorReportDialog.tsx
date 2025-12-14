"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import moment from "moment";
import axios from "axios";
import { DoctorSession } from "../page";

type Props = {
  record: DoctorSession;
};

export default function ViewDoctorReportDialog({ record }: Props) {
  const report = record?.report as any;
  const access = JSON.parse(localStorage.getItem("doctorAccess")!);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const addDoctorNote = async () => {
    setLoading(true);
    await axios.post("/api/doctor/add-note", {
      sessionChartId: record.id,
      doctorName: access.doctorName,
      doctorEmail: access.doctorEmail,
      note,
    });
    setNote("");
    setLoading(false);
    alert("Doctor note added successfully");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          View Report
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Medical AI Consultation Report
          </DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <div className="mt-6 space-y-6 text-sm text-gray-800">

            {/* CONSULTATION INFO */}
            <section>
              <h2 className="font-bold text-blue-600 text-lg mb-2">
                Consultation Info
              </h2>
              <div className="grid grid-cols-2 gap-y-2">
                <p>
                  <span className="font-semibold">AI Specialist:</span>{" "}
                  {record?.SelectedDoctor?.specialist}
                </p>
                <p>
                  <span className="font-semibold">Consult Date:</span>{" "}
                  {moment(new Date(record.createdOn)).format("LLL")}
                </p>
                <p>
                  <span className="font-semibold">Session ID:</span>{" "}
                  {report?.sessionId}
                </p>
                <p>
                  <span className="font-semibold">Patient:</span>{" "}
                  {report?.user}
                </p>
              </div>
            </section>

            {/* SUMMARY */}
            <section>
              <h2 className="font-bold text-blue-600 text-lg mb-2">
                Summary
              </h2>
              <p>
                <span className="font-semibold">Chief Complaint:</span>{" "}
                {report?.chiefComplaint}
              </p>
              <p className="mt-1">{report?.summary}</p>
            </section>

            {/* DETAILS */}
            <section>
              <h2 className="font-bold text-blue-600 text-lg mb-2">
                Clinical Details
              </h2>
              <p>
                <span className="font-semibold">Symptoms:</span>{" "}
                {report?.symptoms?.join(", ") || "Not specified"}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {report?.duration}
              </p>
              <p>
                <span className="font-semibold">Severity:</span>{" "}
                {report?.severity}
              </p>
              <p>
                <span className="font-semibold">
                  Medications Mentioned:
                </span>{" "}
                {report?.medicationsMentioned?.join(", ") || "None"}
              </p>
            </section>

            {/* RECOMMENDATIONS */}
            <section>
              <h2 className="font-bold text-blue-600 text-lg mb-2">
                AI Recommendations
              </h2>
              <ul className="list-disc list-inside space-y-1">
                {report?.recommendations?.map(
                  (rec: string, idx: number) => (
                    <li key={idx}>{rec}</li>
                  )
                )}
              </ul>
            </section>

            {/* DOCTOR NOTE */}
            <section className="border-t pt-4">
              <h2 className="font-bold text-green-600 text-lg mb-2">
                Doctor’s Comment
              </h2>
              <Textarea
                placeholder="Write your medical advice or observation..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                className="mt-3"
                onClick={addDoctorNote}
                disabled={!note || loading}
              >
                {loading ? "Saving..." : "Add Note"}
              </Button>
            </section>

            {/* DISCLAIMER */}
            <p className="text-xs text-red-600 font-medium mt-4">
              ⚠️ This report is AI-generated. Final diagnosis and treatment
              decisions must be made by a licensed medical professional.
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
