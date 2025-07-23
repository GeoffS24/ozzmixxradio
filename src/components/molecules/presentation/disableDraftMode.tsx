"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/action";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Check if we're in the browser environment before accessing window
  if (typeof window !== 'undefined' && (window !== window.parent || !!window.opener)) {
    return null;
  }

  const disable = () =>
    startTransition(async () => {
      try {
        await disableDraftMode();
        router.refresh();
      } catch (error) {
        console.error("Error disabling draft mode:", error);
        // Fallback: try to disable via API route
        try {
          await fetch('/api/draft-mode/disable', { method: 'POST' });
          router.refresh();
        } catch (apiError) {
          console.error("API fallback failed:", apiError);
        }
      }
    });

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-md shadow-md">
        {pending ? (
          <span className="text-sm">Disabling draft mode...</span>
        ) : (
          <button
            type="button"
            onClick={disable}
            className="text-sm font-medium hover:text-yellow-800 transition-colors"
          >
            Exit Preview Mode
          </button>
        )}
      </div>
    </div>
  );
}