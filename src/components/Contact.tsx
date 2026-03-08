import { useState } from "react";
import {
  Mail, MapPin, Phone, ExternalLink, Copy, Check,
  Calendar, Github, Linkedin, Twitter, ArrowRight,
} from "lucide-react";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "harshal.wrk@gmail.com",
    copyValue: "harshal.wrk@gmail.com",
    link: "mailto:harshal.wrk@gmail.com",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8828984985",
    copyValue: "+918828984985",
    link: "tel:+918828984985",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mumbai, India",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10 border-pink-500/20",
  },
];

const Contact = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="contact" className="py-28 relative bg-[#080808] overflow-hidden">
      <div className="absolute rounded-full blur-3xl pointer-events-none w-[700px] h-[700px] bg-violet-600/10 left-1/2 -translate-x-1/2 top-0" />
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 before:content-[''] before:w-6 before:h-px before:bg-violet-400 after:content-[''] after:w-6 after:h-px after:bg-violet-400">
            Contact
          </span>
          <h2 className="font-bold leading-tight tracking-tight text-4xl md:text-5xl text-white mb-4">
            Let's build something{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              great together
            </span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            I'm open to new opportunities, freelance projects, and interesting collaborations.
            Drop me a message!
          </p>
        </div>

        {/* CTA banner */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-900/30 via-[#0d0d18] to-indigo-900/20 p-8 md:p-12 mb-10 max-w-4xl mx-auto">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 justify-between">
            <div className="text-center md:text-left">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">
                Ready to start a project?
              </h3>
              <p className="text-white/40 max-w-md">
                Whether you need a new web application, a cloud migration, or just want to
                explore ideas — I'm here.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="mailto:harshal.wrk@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-violet-600 text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-600/25 active:scale-[0.98]"
              >
                <Mail size={16} />
                Send Email
                <ArrowRight size={14} />
              </a>
              <a
                href="https://calendly.com/harshal-wrk"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-white/10 text-white/80 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white active:scale-[0.98]"
              >
                <Calendar size={16} />
                Book a Call
              </a>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {contactCards.map((info) => (
            <div
              key={info.label}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-2xl transition-all duration-300 hover:bg-white/[0.06] hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-900/10 p-6 flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${info.iconBg}`}>
                <info.icon size={18} className={info.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/30 text-xs mb-0.5">{info.label}</p>
                <p className="text-white text-sm font-medium truncate">{info.value}</p>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                {info.link && (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
                {info.copyValue && (
                  <button
                    onClick={() => handleCopy(info.copyValue!)}
                    className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {copied === info.copyValue ? (
                      <Check size={13} className="text-emerald-400" />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Socials */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {[
            { href: "https://github.com/harshal-singh", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/harshal-singh-56a55a236/", icon: Linkedin, label: "LinkedIn" },
            { href: "https://x.com/harshal_8ingh", icon: Twitter, label: "Twitter" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-violet-500/15 hover:border-violet-500/30 transition-all duration-200"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
