import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  try {
    if (error) {
      throw new Error(searchParams.get("error_description") || "Unknown error");
    }

    if (!code) {
      throw new Error("Authorization code is missing");
    }
  } catch(err: any) {
    console.error('OAuth Error:', err.message)

    const redirectUrl = new URL('/error', request.url).toString();
    return NextResponse.redirect(redirectUrl);
  }
}
