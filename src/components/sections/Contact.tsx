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
      className="relative py-28 md:py-36 bg-[var(--canvas)] text-[var(--ink)] border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Giant Section CTA */}
        <div className="max-w-4xl mb-16">
          <Reveal y={15}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-5 h-[2.5px] bg-[var(--theme)] inline-block" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--theme)] font-bold">
                08 — INITIATE CONSULTATION
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={20}>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] text-[var(--ink)] mb-6">
              LET’S TALK ABOUT YOUR PROJECT.
            </h2>
          </Reveal>

          <Reveal delay={0.2} y={20}>
            <p className="text-lg text-slate-600 font-body max-w-2xl leading-relaxed">
              Whether you need precision block manufacturing machinery or paving blocks
              for an expansive development, our engineers in Hokandara are ready.
            </p>
          </Reveal>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Phone Card */}
            <a
              href={site.phoneHref}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[var(--theme)]/60 hover:shadow-md transition-all flex items-start gap-4 block group"
            >
              <div className="w-12 h-12 rounded-xl bg-white text-[var(--theme)] border border-slate-200 flex items-center justify-center transition-colors shrink-0 shadow-2xs group-hover:bg-[var(--theme)] group-hover:text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
                  HOTLINE / TECHNICAL ADVICE
                </span>
                <div className="font-display text-2xl text-[var(--ink)]">
                  {site.phone}
                </div>
                <div className="font-mono text-xs text-slate-500">
                  Office: {site.office}
                </div>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${site.email}`}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[var(--theme)]/60 hover:shadow-md transition-all flex items-start gap-4 block group"
            >
              <div className="w-12 h-12 rounded-xl bg-white text-[var(--theme)] border border-slate-200 flex items-center justify-center transition-colors shrink-0 shadow-2xs group-hover:bg-[var(--theme)] group-hover:text-white">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
                  CORPORATE INQUIRIES
                </span>
                <div className="font-display text-2xl text-[var(--ink)]">
                  {site.email}
                </div>
                <div className="font-mono text-xs text-slate-500">
                  Immediate dispatch response
                </div>
              </div>
            </a>

            {/* Facility Address Card */}
            <a
              href={site.map}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[var(--theme)]/60 hover:shadow-md transition-all flex items-start gap-4 block group"
            >
              <div className="w-12 h-12 rounded-xl bg-white text-[var(--theme)] border border-slate-200 flex items-center justify-center transition-colors shrink-0 shadow-2xs group-hover:bg-[var(--theme)] group-hover:text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
                  HOKANDARA YARD & SHOWROOM
                </span>
                <div className="font-mono text-sm text-[var(--ink)] font-semibold">
                  {site.address}
                </div>
                <div className="font-mono text-xs text-[var(--theme)] flex items-center gap-1 pt-1 font-bold">
                  <span>Open Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: Interactive Form (Zero pills) */}
          <div className="lg:col-span-7 bg-slate-50/90 border border-slate-200 p-8 sm:p-10 rounded-2xl shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[var(--theme)] mx-auto flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-[var(--ink)]">
                  INQUIRY PREPARED!
                </h3>
                <p className="text-sm text-slate-600 font-body max-w-md mx-auto">
                  Your email client has been opened with your project specifications.
                  Our technical engineers will review and reach out promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs uppercase tracking-wider mt-4 text-slate-800 hover:bg-slate-50 shadow-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" suppressHydrationWarning>
                  <div className="space-y-2" suppressHydrationWarning>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
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
                      className="bg-white border-slate-200 text-slate-900 focus:border-[var(--theme)] focus:ring-[var(--theme)] h-11 rounded-lg"
                    />
                  </div>

                  <div className="space-y-2" suppressHydrationWarning>
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
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
                      className="bg-white border-slate-200 text-slate-900 focus:border-[var(--theme)] focus:ring-[var(--theme)] h-11 rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2" suppressHydrationWarning>
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                    Area of Interest
                  </label>
                  <select
                    value={formState.interest}
                    suppressHydrationWarning
                    onChange={(e) =>
                      setFormState({ ...formState, interest: e.target.value })
                    }
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[var(--theme)] font-medium"
                  >
                    <option value="Interlock Paving Blocks">
                      Interlock Paving Blocks & Patterns
                    </option>
                    <option value="SDLG Wheel Loaders & Earthmovers">
                      SDLG Wheel Loaders & Earthmovers
                    </option>
                    <option value="Noah & Shengya Block Machines">
                      Noah & Shengya Block Making Machines
                    </option>
                    <option value="Road Rollers & Compactors">
                      Road Rollers & Compactors
                    </option>
                    <option value="Ready-Mix Batching Plants">
                      Ready-Mix Concrete Batching Plants
                    </option>
                    <option value="ICTAD Construction Partnership">
                      ICTAD Construction Project Collaboration
                    </option>
                  </select>
                </div>

                <div className="space-y-2" suppressHydrationWarning>
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
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
                    className="bg-white border-slate-200 text-slate-900 focus:border-[var(--theme)] focus:ring-[var(--theme)] rounded-lg"
                  />
                </div>

                <Magnetic strength={0.2}>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[var(--theme)] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[var(--theme-hover)] transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
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
