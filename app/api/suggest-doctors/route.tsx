import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {notes} = await req.json();
    try{
       const completion = await openai.chat.completions.create({
    model: 'google/gemini-2.0-flash-exp:free',
    messages: [
      {
        role: 'system',
        content: JSON.stringify(AIDoctorAgents),
      },
      {
        role: 'user',
        content: "User Note/Symptoms:" + notes + ", Depends on user notes and symptoms, Please suggest list of doctors , Return Object JSON only",
      },
    ],
  });

  const rawresp = completion.choices[0].message;
  //@ts-ignore
  const resp = rawresp.content.trim().replace('```json' , '').replace('```','')
  const JSONres = JSON.parse(resp);
  return NextResponse.json(JSONres);
    }catch(e){
       return NextResponse.json(e)
    }
}