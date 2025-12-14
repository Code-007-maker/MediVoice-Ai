"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DoctorNote = {
  id: number;
  doctor_name: string;
  doctor_email: string;
  note: string;
  created_at: string;
};

type Props = {
  sessionId: number;
};

export default function DoctorNotesDialog({ sessionId }: Props) {
  const [notes, setNotes] = useState<DoctorNote[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/doctor/notes?sessionId=${sessionId}`
      );
      setNotes(res.data || []);
      console.log(notes)
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link" size="sm"
          onClick={fetchNotes}
        >
          Doctor Notes
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Doctor Notes for this Session
          </DialogTitle>
        </DialogHeader>

        {loading && (
          <p className="text-sm text-gray-500">Loading notes...</p>
        )}

        {!loading && notes.length === 0 && (
          <p className="text-sm text-gray-500">
            No doctor notes available for this session.
          </p>
        )}

        <div className="space-y-4 mt-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Dr. {note.doctorName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {note.doctorEmail}
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  {moment(note.created_at).fromNow()}
                </p>
              </div>

              <p className="mt-3 text-gray-700 text-sm whitespace-pre-line">
                {note.note}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
