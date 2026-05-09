"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/lib/data";
import { Mail, MapPin, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    const stored = JSON.parse(localStorage.getItem("hs_messages") || "[]");
    stored.push({ ...form, ts: new Date().toISOString() });
    localStorage.setItem("hs_messages", JSON.stringify(stored));
    toast.success("Message sent! I'll get back within 48h.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24">
      <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent p-8 md:p-14 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-3xl rounded-full pointer-events-none" />
        <div className="relative grid md:grid-cols-2 gap-10">
          <div>
            <p className="mono text-xs uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Let&apos;s build
            </p>
            <h2 className="heading text-4xl md:text-6xl font-semibold leading-[0.95] mb-6">
              Have a project
              <br />
              in mind?
            </h2>
            <p className="text-zinc-400 max-w-md leading-relaxed mb-8">
              I take on a small number of freelance and contract engagements
              each quarter. If you&apos;ve got a product that needs careful
              engineering, drop a line.
            </p>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-zinc-200 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4 text-accent" />
                {profile.email}
              </a>
              <p className="flex items-center gap-3 text-zinc-400">
                <MapPin className="w-4 h-4 text-accent" />
                {profile.location}
              </p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mono text-xs text-zinc-500 mb-1.5 block">
                NAME
              </label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mono text-xs text-zinc-500 mb-1.5 block">
                EMAIL
              </label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="mono text-xs text-zinc-500 mb-1.5 block">
                MESSAGE
              </label>
              <Textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the project..."
              />
            </div>
            <Button type="submit" className="w-full font-medium cursor-pointer">
              Send message <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
