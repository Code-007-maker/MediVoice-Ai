import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { doctorNotesTable } from "@/config/schema";

export async function POST(req: NextRequest) {
  const { sessionChartId, doctorName, doctorEmail, note } = await req.json();

  await db.insert(doctorNotesTable).values({
    sessionChartId,
    doctorName,
    doctorEmail,
    note,
  });

  return NextResponse.json({ success: true });
}
