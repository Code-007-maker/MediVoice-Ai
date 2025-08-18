import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
      console.error("User or email is missing", user);
      return NextResponse.json(
        { error: "User not authenticated or email missing" },
        { status: 401 }
      );
    }

    const email = user.primaryEmailAddress.emailAddress;
    const name = user.fullName ?? "Unnamed";

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (users.length === 0) {
      const result = await db.insert(usersTable).values({
        name,
        email,
        credits: 10,
      }).returning();

      return NextResponse.json(result[0]); // ✅ Correct
    } else {
      return NextResponse.json(users[0]); // Optional: return existing user
    }

  } catch (e: any) {
    console.error("❌ Error in /api/users:", e);
    return NextResponse.json(
      { error: e.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
