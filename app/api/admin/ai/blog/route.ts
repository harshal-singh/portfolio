import { NextResponse } from "next/server";
import { withGoogleAuth } from "@/lib/api/withGoogleAuth";
import {
  generateBlogIdeas,
  generateBlogIdeasWithDrafts,
  generateBlogPost,
  type BlogGenerationContext,
} from "@/lib/ai/gemini";

export const POST = withGoogleAuth(async (req) => {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      {
        error: "GEMINI_API_KEY missing",
        hint: "Get a free key at https://aistudio.google.com/apikey and add GEMINI_API_KEY to .env.local",
      },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { action, count = 3, topic, idea, context, excludeTitles } = body as {
    action: "ideas" | "ideas-with-drafts" | "draft" | "regenerate";
    count?: number;
    topic?: string;
    idea?: { title: string; category?: string; excerpt?: string };
    context?: BlogGenerationContext;
    excludeTitles?: string[];
  };

  if (!context?.author?.name) {
    return NextResponse.json(
      { error: "Portfolio context missing — reload the admin page." },
      { status: 400 }
    );
  }

  try {
    if (action === "ideas") {
      const ideas = await generateBlogIdeas(Math.min(count, 3), topic, context, {
        excludeTitles,
      });
      return NextResponse.json({ ideas });
    }

    if (action === "ideas-with-drafts") {
      const items = await generateBlogIdeasWithDrafts(
        Math.min(count, 3),
        topic,
        context,
        undefined,
        { excludeTitles },
      );
      return NextResponse.json({ items });
    }

    if ((action === "draft" || action === "regenerate") && idea?.title) {
      const draft = await generateBlogPost(idea, context, {
        newAngle: action === "regenerate",
      });
      return NextResponse.json({ draft });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("[ai/blog]", err);
    const message = err instanceof Error ? err.message : "AI generation failed";
    const isQuota = /quota|limit: 0|resource_exhausted/i.test(message);
    return NextResponse.json(
      {
        error: isQuota
          ? "Gemini quota error. Try GEMINI_MODEL=gemini-2.5-pro in .env.local or check https://ai.dev/rate-limit"
          : message,
        hint: isQuota
          ? "Create the key at https://aistudio.google.com/apikey (Google AI Studio), not Google Cloud Console."
          : undefined,
      },
      { status: isQuota ? 429 : 500 }
    );
  }
});
