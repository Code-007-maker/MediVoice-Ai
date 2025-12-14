import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { doctorNotesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    const notes = await db
      .select()
      .from(doctorNotesTable)
      .where(eq(doctorNotesTable.sessionChartId, Number(sessionId)))
      .orderBy(doctorNotesTable.createdAt);

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Doctor notes fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
