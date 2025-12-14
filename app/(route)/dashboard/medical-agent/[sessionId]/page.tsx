"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  SelectedDoctor: doctorAgent;
  createdOn: string;
};

type Message = { role: string; text: string };

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const router = useRouter();

  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const vapiRef = useRef<any>(null);

  /* -------------------- FETCH SESSION -------------------- */
  useEffect(() => {
    if (sessionId) getSessionDetails();
  }, [sessionId]);

  const getSessionDetails = async () => {
    const result = await axios.get(
      `/api/session-chart?sessionId=${sessionId}`
    );
    setSessionDetail(result.data);
  };

  /* -------------------- VAPI HANDLERS -------------------- */
  const handleCallStart = () => {
    console.log("Call started");
    setCallStarted(true);
  };

  const handleCallEnd = () => {
    console.log("Call ended");
    setCallStarted(false);
  };

  const handleMessage = (message: any) => {
    if (message.type === "transcript") {
      const { role, transcriptType, transcript } = message;

      if (transcriptType === "partial") {
        setLiveTranscript(transcript);
        setCurrentRole(role);
      }

      if (transcriptType === "final") {
        setMessages((prev) => [...prev, { role, text: transcript }]);
        setLiveTranscript("");
        setCurrentRole(null);
      }
    }
  };

  /* -------------------- START CALL -------------------- */
  const startCall = async () => {
    if (!sessionDetail) return;

    setLoading(true);

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    vapiRef.current = vapi;

    const config = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I am your AI medical assistant. How are you feeling today?",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "11labs",
        voiceId: "Sarah",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: sessionDetail.SelectedDoctor.agentPrompt,
          },
        ],
      },
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);

    await vapi.start(config);
    setLoading(false);
  };

  /* -------------------- END CALL -------------------- */
  const endCall = async () => {
    setLoading(true);

    const vapi = vapiRef.current;
    if (!vapi) {
      setLoading(false);
      return;
    }

    try {
      await vapi.stop();
    } catch (e) {
      console.error("Stop error:", e);
    }

    vapi.off("call-start", handleCallStart);
    vapi.off("call-end", handleCallEnd);
    vapi.off("message", handleMessage);

    vapiRef.current = null;
    setCallStarted(false);

    try {
      await generateReport();
      toast.success("Medical report generated successfully");
      router.replace("/dashboard");
    } catch {
      toast.error("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- REPORT GENERATION -------------------- */
  const generateReport = async () => {
    const result = await axios.post("/api/medical-report", {
      messages,
      sessionDetail,
      sessionId,
    });
    return result.data;
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected..." : "Not connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">Live</h2>
      </div>

      {sessionDetail && (
        <div className="flex flex-col items-center mt-10">
          <Image
            src={sessionDetail.SelectedDoctor.image}
            alt={sessionDetail.SelectedDoctor.specialist}
            width={100}
            height={100}
            className="rounded-full"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetail.SelectedDoctor.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-10 text-center">
            {messages.slice(-2).map((msg, i) => (
              <p key={i} className="text-gray-400">
                {msg.role}: {msg.text}
              </p>
            ))}
            {liveTranscript && (
              <p className="text-lg">
                {currentRole}: {liveTranscript}
              </p>
            )}
          </div>

          {!callStarted ? (
            <Button
              className="mt-10"
              onClick={startCall}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <PhoneCall />}
              Start Call
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="mt-10"
              onClick={endCall}
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : <PhoneOff />}
              Disconnect
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
