"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";
import { Phone, Mail, MapPin, Send, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    interest: "Interlock Paving Blocks",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(`Project Inquiry: ${formState.interest} - ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nPhone: ${formState.phone}\nRequirement: ${formState.interest}\nMessage: ${formState.message}\n`
    );

    window.open(`mailto:${site.email}?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36 bg-[var(--ink)] text-[var(--paper)] border-t border-[var(--line-dark)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Giant Anton Section CTA */}
        <div className="max-w-4xl mb-16">
          <Reveal y={15}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-[2px] bg-[var(--safety)] inline-block" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--safety)]">
                08 — INITIATE CONSULTATION
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={20}>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-[var(--paper)] mb-6">
              LET’S TALK ABOUT YOUR PROJECT.
            </h2>
          </Reveal>

          <Reveal delay={0.2} y={20}>
            <p className="text-lg text-[var(--steel)] font-body max-w-2xl leading-relaxed">
              Whether you need precision block manufacturing machinery or paving blocks
              for an expansive development, our engineers in Hokandara are ready.
            </p>
          </Reveal>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Card */}
            <a
              href={site.phoneHref}
              className="p-6 rounded-xl bg-[var(--graphite)] border border-[var(--line-dark)] hover:border-white/20 transition-all flex items-start gap-4 block group"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 group-hover:bg-[var(--safety)] group-hover:text-[var(--safety-ink)] text-[var(--safety)] flex items-center justify-center transition-colors shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--steel)] uppercase tracking-wider block">
                  HOTLINE / TECHNICAL ADVICE
                </span>
                <div className="font-display text-2xl text-[var(--paper)]">
                  {site.phone}
                </div>
                <div className="font-mono text-xs text-[var(--steel)]">
                  Office: {site.office}
                </div>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${site.email}`}
              className="p-6 rounded-xl bg-[var(--graphite)] border border-[var(--line-dark)] hover:border-white/20 transition-all flex items-start gap-4 block group"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 group-hover:bg-[var(--safety)] group-hover:text-[var(--safety-ink)] text-[var(--safety)] flex items-center justify-center transition-colors shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--steel)] uppercase tracking-wider block">
                  CORPORATE INQUIRIES
                </span>
                <div className="font-display text-2xl text-[var(--paper)]">
                  {site.email}
                </div>
                <div className="font-mono text-xs text-[var(--steel)]">
                  Immediate dispatch response
                </div>
              </div>
            </a>

            {/* Facility Address Card */}
            <a
              href={site.map}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-xl bg-[var(--graphite)] border border-[var(--line-dark)] hover:border-white/20 transition-all flex items-start gap-4 block group"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 group-hover:bg-[var(--safety)] group-hover:text-[var(--safety-ink)] text-[var(--safety)] flex items-center justify-center transition-colors shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--steel)] uppercase tracking-wider block">
                  HOKANDARA YARD & SHOWROOM
                </span>
                <div className="font-mono text-sm text-[var(--paper)] font-medium">
                  {site.address}
                </div>
                <div className="font-mono text-xs text-[var(--safety)] flex items-center gap-1 pt-1">
                  <span>Open Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[var(--graphite)] border border-[var(--line-dark)] p-8 sm:p-10 rounded-2xl shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[var(--safety)]/20 text-[var(--safety)] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-[var(--paper)]">
                  INQUIRY PREPARED!
                </h3>
                <p className="text-sm text-[var(--steel)] font-body max-w-md mx-auto">
                  Your email client has been opened with your project specifications.
                  Our technical engineers will review and reach out immediately.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 font-mono text-xs uppercase tracking-wider mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" suppressHydrationWarning>
                  <div className="space-y-2" suppressHydrationWarning>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--steel)]">
                      Your Name
                    </label>
                    <Input
                      required
                      placeholder="e.g. Kasun Silva"
                      value={formState.name}
                      suppressHydrationWarning
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="bg-black/30 border-[var(--line-dark)] text-[var(--paper)] focus:border-[var(--safety)] focus:ring-[var(--safety)] h-11"
                    />
                  </div>

                  <div className="space-y-2" suppressHydrationWarning>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--steel)]">
                      Phone Number
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="e.g. +94 77 123 4567"
                      value={formState.phone}
                      suppressHydrationWarning
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      className="bg-black/30 border-[var(--line-dark)] text-[var(--paper)] focus:border-[var(--safety)] focus:ring-[var(--safety)] h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2" suppressHydrationWarning>
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--steel)]">
                    Area of Interest
                  </label>
                  <select
                    value={formState.interest}
                    suppressHydrationWarning
                    onChange={(e) =>
                      setFormState({ ...formState, interest: e.target.value })
                    }
                    className="w-full bg-black/30 border border-[var(--line-dark)] rounded-lg px-3.5 py-2.5 text-sm text-[var(--paper)] focus:outline-none focus:border-[var(--safety)] font-medium"
                  >
                    <option value="Interlock Paving Blocks" className="bg-[var(--graphite)]">
                      Interlock Paving Blocks & Patterns
                    </option>
                    <option value="SDLG Wheel Loaders & Earthmovers" className="bg-[var(--graphite)]">
                      SDLG Wheel Loaders & Earthmovers
                    </option>
                    <option value="Noah & Shengya Block Machines" className="bg-[var(--graphite)]">
                      Noah & Shengya Block Making Machines
                    </option>
                    <option value="Road Rollers & Compactors" className="bg-[var(--graphite)]">
                      Road Rollers & Compactors
                    </option>
                    <option value="Ready-Mix Batching Plants" className="bg-[var(--graphite)]">
                      Ready-Mix Concrete Batching Plants
                    </option>
                    <option value="ICTAD Construction Partnership" className="bg-[var(--graphite)]">
                      ICTAD Construction Project Collaboration
                    </option>
                  </select>
                </div>

                <div className="space-y-2" suppressHydrationWarning>
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--steel)]">
                    Project Details / Approximate Quantity
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Tell us about your project location, timeline, and machinery or paving volume..."
                    value={formState.message}
                    suppressHydrationWarning
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="bg-black/30 border-[var(--line-dark)] text-[var(--paper)] focus:border-[var(--safety)] focus:ring-[var(--safety)]"
                  />
                </div>

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--safety)] text-[var(--safety-ink)] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-98"
                  >
                    <span>SUBMIT PROJECT INQUIRY</span>
                    <Send className="w-4 h-4" />
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
