import { currentUser } from "@clerk/nextjs/server";
import { db, repositories, users } from "@/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

  const body = await req.json();

  const insertedRepo = await db
    .insert(repositories)
    .values({
      userId: body.userId ?? user.id,
      repoId: body.repoId,
      name: body.name,
      fullName: body.fullName,
      private: body.private,
      htmlUrl: body.htmlUrl,
      description: body.description,
      updatedAt: new Date(body.updatedAt),
      owner: body.owner,
    })
    .returning();

  return NextResponse.json({
    success: true,
    user,
    repo: insertedRepo[0],
  });
}



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");

  const result = await db
    .select()
    .from(repositories)
    .where(eq(repositories.userId, Number(userId)));

  return NextResponse.json(result);
}
