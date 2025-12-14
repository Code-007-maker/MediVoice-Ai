import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { sessionChartTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { patientEmail } = await req.json();

  const sessions = await db
    .select()
    .from(sessionChartTable)
    .where(eq(sessionChartTable.createdBy, patientEmail))
    .orderBy(sessionChartTable.id);

  return NextResponse.json(sessions);
}
