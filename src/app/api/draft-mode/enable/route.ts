import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("🔧 Draft mode enable called");
    console.log("🔧 Request URL:", request.url);
    console.log("🔧 Request headers:", Object.fromEntries(request.headers.entries()));

    // Enable draft mode
    const draft = await draftMode();
    draft.enable();

    console.log("🔧 Draft mode enabled successfully");

    // Get the slug parameter or default to home page
    const { searchParams } = request.nextUrl;
    const slug = searchParams.get("slug") || "/";

    // Build the redirect URL using the current request's host
    const host = request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const redirectUrl = `${protocol}://${host}${slug}`;

    console.log("🔧 Redirecting to:", redirectUrl);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("❌ Error enabling draft mode:", error);
    return NextResponse.json(
      { error: "Failed to enable draft mode", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}