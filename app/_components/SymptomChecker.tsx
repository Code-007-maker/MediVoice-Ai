"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/symptom-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Something went wrong");
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 border rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🩺 Free AI Symptom Checker
      </h2>

      <textarea
        className="w-full border rounded-lg p-3 mb-4"
        rows={4}
        placeholder="Describe your symptoms (e.g. fever, cough, headache...)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <Button
        className="w-full"
        onClick={handleCheck}
        disabled={loading || !symptoms}
      >
        {loading ? "Analyzing..." : "Check Symptoms"}
      </Button>

      {result && (
        <div className="mt-6 space-y-3">
          <p><b>Probable Condition:</b> {result.probableDisease}</p>
          <p><b>Risk Level:</b> {result.riskLevel}</p>

          <div>
            <b>Advice:</b>
            <ul className="list-disc ml-5">
              {result.advice?.map((a: string, i: number) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

          <div>
            <b>Common Medicines:</b>
            <ul className="list-disc ml-5">
              {result.medicines?.map((m: string, i: number) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-sm text-red-600 font-semibold">
            ⚠️ {result.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
