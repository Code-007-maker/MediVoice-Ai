import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { doctorAccessTable } from "@/config/schema";
import { addMinutes } from "date-fns";
import nodemailer  from "nodemailer"
export const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.NEXT_PUBLIC_EMAIL_USER, pass: process.env.NEXT_PUBLIC_EMAIL_PASS, }, });

export async function POST(req: NextRequest) {
  const { doctorName, doctorEmail, patientEmail } = await req.json();

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = addMinutes(new Date(), 30);

  await db.insert(doctorAccessTable).values({
    doctorName,
    doctorEmail,
    patientEmail,
    otp,
    expiresAt
  });

  await transporter.sendMail({
    to: patientEmail,
    subject: "Doctor Access OTP",
    html: `
      <p>Your OTP for doctor access:</p>
      <h2>${otp}</h2>
      <p>Valid for 30 minutes.</p>
    `,
  });

  return NextResponse.json({ success: true });
}
