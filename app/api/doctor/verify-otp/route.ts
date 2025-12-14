import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { doctorAccessTable } from "@/config/schema";
import { and, eq, gt } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { doctorEmail, patientEmail, otp } = await req.json();

    const result = await db
      .select()
      .from(doctorAccessTable)
      .where(
        and(
          eq(doctorAccessTable.doctorEmail, doctorEmail),
          eq(doctorAccessTable.patientEmail, patientEmail),
          eq(doctorAccessTable.otp, otp),
          gt(doctorAccessTable.expiresAt, new Date())
        )
      )
      .limit(1);

    const access = result[0];

    if (!access) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      expiresAt: access.expiresAt,
    });
  } catch (error: any) {
    console.error("Verify OTP Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
