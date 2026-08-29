"use client";

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
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <p className="text-label text-accent mb-3">Availability</p>
            <p className="text-body-lg text-foreground font-medium">
              {profile.status}
            </p>
            {profile.contactAvailabilityDescription ? (
              <p className="text-body text-muted mt-3 leading-relaxed">
                {profile.contactAvailabilityDescription}
              </p>
            ) : null}
          </div>

          <div className="space-y-4">
            <CopyEmailButton email={profile.email} variant="card" />

            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-border-subtle bg-surface hover:border-accent/25 transition-colors"
            >
              <Phone className="w-4 h-4 text-accent" aria-hidden />
              <span className="text-sm text-foreground">{profile.phone}</span>
            </a>

            <p className="flex items-center gap-3 p-4 rounded-xl border border-border-subtle bg-surface">
              <MapPin className="w-4 h-4 text-accent" aria-hidden />
              <span className="text-sm text-muted">{profile.location}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="GitHub (opens in new tab)"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-md border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="LinkedIn (opens in new tab)"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <Link
              href="/resume"
              className="mono text-xs text-muted hover:text-accent link-underline ml-2"
            >
              View resume →
            </Link>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-3 space-y-4 p-6 md:p-8 rounded-2xl border border-border-subtle bg-surface"
          noValidate
        >
          <p className="text-label mb-2">
            {profile.contactFormLabel || "Send a message"}
          </p>
          {profile.contactFormHint ? (
            <p className="text-caption mb-4">{profile.contactFormHint}</p>
          ) : null}
          <div>
            <label htmlFor="contact-name" className="text-label mb-1.5 block">
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
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="text-label mb-1.5 block">
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
            />
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="text-label mb-1.5 block"
            >
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
            />
          </div>
          <Button
            type="submit"
            className="w-full font-medium"
            disabled={submitting}
          >
            {submitting ? "Sending…" : "Send message"}{" "}
            <Send className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}
