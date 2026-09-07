"use client";

import { GlassCard } from "@/components/aurora/GlassCard";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Profile } from "@/lib/types";
import { MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface ContactFormProps {
  profile: Profile;
}

export function ContactForm({ profile }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to send message");
      }
      toast.success(
        profile.contactFormSuccessMessage ||
          "Message sent — I'll respond within 48 hours.",
      );
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send message",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="site-container pb-20 md:pb-28">
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
        <GlassCard className="space-y-8 p-6 md:p-8 lg:col-span-2">
          <div>
            <p className="text-label mb-3">Availability</p>
            <p className="text-lg font-medium text-foreground">{profile.status}</p>
            {profile.contactAvailabilityDescription ? (
              <p className="mt-3 text-base leading-relaxed text-muted">
                {profile.contactAvailabilityDescription}
              </p>
            ) : null}
          </div>

          <div className="space-y-3">
            <CopyEmailButton email={profile.email} variant="card" className="aurora-ghost !w-full !justify-between !rounded-2xl" />
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="aurora-ghost !w-full !justify-start gap-3 !rounded-2xl"
            >
              <Phone className="h-4 w-4 text-accent" aria-hidden />
              <span className="text-sm">{profile.phone}</span>
            </a>
            <p className="aurora-ghost !w-full !justify-start gap-3 !rounded-2xl">
              <MapPin className="h-4 w-4 text-accent" aria-hidden />
              <span className="text-sm text-muted">{profile.location}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="aurora-tag aurora-tag-link"
              aria-label="GitHub (opens in new tab)"
            >
              <GithubIcon className="mr-1.5 inline h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="aurora-tag aurora-tag-link"
              aria-label="LinkedIn (opens in new tab)"
            >
              <LinkedinIcon className="mr-1.5 inline h-3.5 w-3.5" />
              LinkedIn
            </a>
            <Link href="/resume" className="aurora-tag aurora-tag-link">
              View resume ↗
            </Link>
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:p-8 lg:col-span-3">
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <p className="text-label mb-2">
            {profile.contactFormLabel || "Send a message"}
          </p>
          {profile.contactFormHint ? (
            <p className="mb-4 text-sm text-muted">{profile.contactFormHint}</p>
          ) : null}
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
              Name <span className="text-accent">*</span>
            </label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="rounded-xl bg-[var(--aurora-ctl)]"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
              Email <span className="text-accent">*</span>
            </label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
              className="rounded-xl bg-[var(--aurora-ctl)]"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
              Message <span className="text-accent">*</span>
            </label>
            <Textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What are you working on, and how can I help?"
              className="rounded-xl bg-[var(--aurora-ctl)]"
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Sending…" : "Send message"}{" "}
            <Send className="ml-2 h-4 w-4" />
          </Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
