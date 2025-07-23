import { draftMode } from "next/headers";
import {  NextResponse } from "next/server";

export async function GET() {
  try {
    const draft = await draftMode();
    draft.disable();

    return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  } catch (error) {
    console.error("Error disabling draft mode:", error);
    return NextResponse.json(
      { error: "Failed to disable draft mode" },
      { status: 500 }
    );
  }
}
