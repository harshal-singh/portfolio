import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Copy,
  Check,
  MailIcon,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const contactInfo = [
    {
      icon: <Mail className="text-violet-400" size={24} />,
      label: "Email",
      value: "harshal.wrk@gmail.com",
      copyValue: "harshal.wrk@gmail.com",
      link: "mailto:harshal.wrk@gmail.com",
    },
    {
      icon: <MapPin className="text-violet-400" size={24} />,
      label: "Location",
      value: "Mumbai, India",
    },
    {
      icon: <Phone className="text-violet-400" size={24} />,
      label: "Phone",
      value: "+91 8828984985",
      copyValue: "+918828984985",
      link: "tel:+918828984985",
    },
  ];

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/10 to-transparent opacity-50"></div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block px-3 py-1 text-sm font-medium bg-violet-600/20 text-violet-300 rounded-full mb-4">
            Contact Me
          </div>
          <h2 className="section-title section-title-gradient text-center mb-4">
            Let's Connect
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl text-center">
            I'm currently available for freelance work and new opportunities.
            Have a project in mind or just want to chat? Let's connect!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="glass-card p-6 flex flex-col items-center text-center hover:border-violet-500 transition-all group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5 opacity-100 transition-opacity"></div>
              <div className="mb-4 bg-violet-600/20 p-4 rounded-2xl relative z-10">
                {info.icon}
              </div>
              <h3 className="text-xl font-medium text-white mb-2 relative z-10">
                {info.label}
              </h3>
              <p className="text-gray-400 mb-4 relative z-10">{info.value}</p>
              <div className="flex gap-3 mt-auto relative z-10">
                {info.link && (
                  <a
                    href={info.link}
                    target={info.label === "Email" ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:border-violet-500 hover:bg-violet-500/10"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Open
                    </Button>
                  </a>
                )}
                {info.copyValue && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 hover:border-violet-500 hover:bg-violet-500/10"
                    onClick={() => handleCopy(info.copyValue!)}
                  >
                    {copied === info.copyValue ? (
                      <>
                        <Check size={16} className="mr-2 text-green-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center mt-16">
          <div className="max-w-2xl w-full text-center">
            <div className="glass-card p-6 border-violet-500/30">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-gray-300 mb-8">
                Whether you have a project in mind or just want to explore
                possibilities, I'm here to help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:harshal.wrk@gmail.com"
                  className="btn-primary inline-flex items-center justify-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MailIcon size={20} className="mr-2" />
                  Send Me an Email
                </a>
                <a
                  href="https://calendly.com/harshal-wrk"
                  className="btn-secondary inline-flex items-center justify-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Calendar size={20} className="mr-2" />
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
