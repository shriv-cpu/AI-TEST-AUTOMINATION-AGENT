import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID!;
  const redirectUri = process.env.GITHUB_REDIRECT_URL!;

  if (!clientId || !redirectUri) {
    return new Response("Missing GitHub environment variables", {
      status: 500,
    });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo read:user",
  });

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  );
}