import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    user: {
      name: "Test User",
    },
  });
}