import { currentUser } from "@clerk/nextjs/server";
import { db, users } from "@/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = clerkUser.emailAddresses[0].emailAddress;

  let user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    const inserted = await db
      .insert(users)
      .values({
        name: clerkUser.fullName ?? "",
        email,
      })
      .returning();

    user = inserted[0];
  }

  return NextResponse.json({
    success: true,
    user,
  });
}