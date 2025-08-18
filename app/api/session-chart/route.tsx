import { sessionChartTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm"; // ✅ Needed for where() and orderBy()

export async function POST(req: NextRequest) {
  try {
    const { notes, SelectedDoctor } = await req.json();
    const user = await currentUser();

    console.log("Incoming data:", {
      notes,
      SelectedDoctor,
      user: user?.primaryEmailAddress?.emailAddress,
    });

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    const sessionId = uuidv4();

    const result = await db
      .insert(sessionChartTable)
      .values({
        sessionId,
        notes,
        SelectedDoctor,
        createdBy: user.primaryEmailAddress.emailAddress,
        createdOn: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error: any) {
    console.error("POST /api/session-chart error details:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized user" }, { status: 401 });
    }

    if (sessionId === "all") {
      const result = await db
        .select()
        .from(sessionChartTable)
        //@ts-ignore
        .where(eq(sessionChartTable.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(sessionChartTable.id)); // ✅ Needs desc import
      return NextResponse.json(result);
    } else {
      const result = await db
        .select()
        .from(sessionChartTable)
        //@ts-ignore
        .where(eq(sessionChartTable.sessionId, sessionId));

      return NextResponse.json(result[0] || {});
    }
  } catch (error: any) {
    console.error("GET /api/session-chart error details:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
