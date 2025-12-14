import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAiModel";

export async function POST(req: NextRequest) {
  try {
    const { symptoms } = await req.json();

    if (!symptoms) {
      return NextResponse.json(
        { error: "Symptoms are required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are a medical AI assistant. Return ONLY valid JSON. Do not give final diagnosis. Always include a medical disclaimer.",
        },
        {
          role: "user",
          content: `
User symptoms:
${symptoms}

Return response in this JSON format:

{
  "probableDisease": string,
  "riskLevel": "Low" | "Medium" | "High",
  "advice": string[],
  "medicines": string[],
  "disclaimer": string
}
`,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("Empty AI response");

    return NextResponse.json(JSON.parse(content));
  } catch (error: any) {
    console.error("Symptom Checker Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
