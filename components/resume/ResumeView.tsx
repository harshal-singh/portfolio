"use client";

import { GlassCard } from "@/components/aurora/GlassCard";
import { Button } from "@/components/ui/button";
import {
  assetFilename,
  downloadPublicAsset,
  resolvePublicAsset,
} from "@/lib/assets";
import type { Profile } from "@/lib/types";
import { Download, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ResumeViewProps {
  profile: Profile;
}

function resumePdfSource(profile: Profile): string {
  return profile.resumePdfUrl.trim() ? profile.resumePdfUrl : "/api/resume/pdf";
}

/** Hide browser PDF chrome where supported (Chrome, Edge). */
function pdfEmbedUrl(url: string): string {
  return `${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
}

export function ResumeView({ profile }: ResumeViewProps) {
  const [downloading, setDownloading] = useState(false);
  const pdfPath = resumePdfSource(profile);
  const pdfUrl = resolvePublicAsset(pdfPath);
  const downloadName = profile.resumePdfUrl.trim()
    ? assetFilename(
        profile.resumePdfUrl,
        `${profile.name.replace(/\s+/g, "-")}-Resume.pdf`,
      )
    : `${profile.name.replace(/\s+/g, "-").toLowerCase()}-resume.pdf`;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadPublicAsset(pdfPath, downloadName);
    } catch {
      toast.error(
        "Could not download resume. Check that the PDF exists in public/resume or Hero & Profile in admin.",
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="site-container pb-10 md:pb-16">
      <GlassCard
        className="relative mx-auto h-110 max-w-4xl overflow-hidden md:h-[calc(100dvh-18rem)]"
        aria-label="Resume preview"
      >
        <iframe
          src={pdfEmbedUrl(pdfUrl)}
          title={`${profile.name} — resume preview`}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none select-none overflow-hidden"
          tabIndex={-1}
        />

        <div
          className="absolute inset-0 bg-linear-to-t from-background via-background/75 to-transparent pointer-events-none"
          aria-hidden
        />

        <div className="lg:scale-125 absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 md:p-6 pointer-events-none">
          <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2.5 min-w-42">
            <Button
              onClick={handleDownload}
              disabled={downloading}
              className="gap-2 shadow-sm"
            >
              <Download className="w-4 h-4 shrink-0" />
              {downloading ? "Downloading…" : "Download Resume"}
            </Button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="aurora-ghost backdrop-blur-sm"
            >
              <ExternalLink className="h-4 w-4 shrink-0" />
              Open in New Tab
            </a>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
