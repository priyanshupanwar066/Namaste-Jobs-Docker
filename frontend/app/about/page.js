"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Rocket,
  Users,
  Handshake,
  MapPin,
  Lightbulb,
  Briefcase,
  ShieldCheck,
  Zap,
} from "lucide-react";

// ─── Namaste Icon (for branding consistency) ─────────────────────────────────
function NamasteIconLarge() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-blue-600">
      <path d="M32 8C32 8 24 16 24 24C24 28 26 32 28 34C28 34 20 38 16 44C12 50 12 56 16 58C20 60 28 56 32 52C36 56 44 60 48 58C52 56 52 50 48 44C44 38 36 34 36 34C38 32 40 28 40 24C40 16 32 8 32 8Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 8V20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 28C20 28 24 24 32 24C40 24 44 28 44 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 44C16 44 24 40 32 40C40 40 48 44 48 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const About = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;

  const features = [
    {
      icon: Briefcase,
      title: "Diverse Listings",
      content: "10,000+ active job postings curated across 50+ industries — from early-career to senior leadership roles.",
      tag: "Scale",
    },
    {
      icon: Users,
      title: "Trusted Network",
      content: "Partnered with 500+ leading Indian companies, verified for quality and active hiring intent.",
      tag: "Trust",
    },
    {
      icon: Lightbulb,
      title: "Career Growth",
      content: "Personalised resources, skill assessments, and guidance to accelerate your professional journey.",
      tag: "Development",
    },
    {
      icon: MapPin,
      title: "Nationwide Reach",
      content: "Opportunities spanning 100+ cities — from metro tech hubs to emerging Tier 2 markets across India.",
      tag: "Coverage",
    },
    {
      icon: Handshake,
      title: "Direct Hiring",
      content: "Bypass middlemen and connect directly with company HR teams and hiring managers.",
      tag: "Efficiency",
    },
    {
      icon: Zap,
      title: "Quick Apply",
      content: "One-click applications, real-time status tracking, and instant notifications keep you in control.",
      tag: "Speed",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Active Listings" },
    { value: "500+", label: "Partner Companies" },
    { value: "100+", label: "Cities Covered" },
    { value: "50K+", label: "Professionals Placed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Hero Header ───────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#2563eb 1.5px, transparent 1.5px)`,
            backgroundSize: "24px 24px",
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <NamasteIconLarge />
            </motion.div>
            <motion.p variants={fadeUp} className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">
              Who We Are
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
              India&apos;s Premier<br />
              <span className="text-blue-600">
                Tech Careers Platform
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              NamasteJobs connects India&apos;s most ambitious tech professionals with the
              companies building tomorrow. Verified listings. Real opportunities. Zero noise.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Stats Row ─────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all"
            >
              <div className="text-3xl font-black text-blue-600 tracking-tight mb-1">{s.value}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mission ───────────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="pb-16"
        >
          <div className="bg-white rounded-2xl border border-slate-200 p-10 md:p-14">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 mb-8">
                <Rocket className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Our Mission</p>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-5">
                Redefining How India Finds Work
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                We built NamasteJobs to solve a real problem — India&apos;s job market is enormous,
                but finding the right role is still painfully slow and opaque. Our mission is to
                bring transparency, speed, and trust to tech hiring through smart technology,
                verified listings, and a platform built for how professionals actually search for jobs.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Features Grid ─────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="pb-16"
        >
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Platform Highlights
            </p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Why Professionals Choose Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="group bg-white rounded-2xl border border-slate-200 p-7 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                    <feature.icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Story / Values ────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="pb-16"
        >
          <div className="grid md:grid-cols-2 gap-6">

            {/* Story */}
            <motion.div variants={fadeUp} className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-10 relative overflow-hidden">
              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-3">Our Story</p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                  Built in India,<br />for India
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  NamasteJobs was founded by engineers who experienced firsthand how broken the
                  hiring process was — for both candidates and companies. We built the platform
                  we always wished existed: fast, honest, and focused on tech talent.
                </p>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200 p-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Our Values</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                What We Stand For
              </h3>
              <div className="space-y-5">
                {[
                  { icon: ShieldCheck, label: "Transparency", desc: "Every listing is vetted. No ghost jobs, no misleading descriptions." },
                  { icon: Zap, label: "Speed", desc: "Get discovered faster. Apply in seconds, hear back sooner." },
                  { icon: Users, label: "Inclusivity", desc: "Opportunities for every professional, across every city in India." },
                ].map((v) => (
                  <div key={v.label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <v.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 mb-0.5">{v.label}</p>
                      <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="pb-20"
        >
          <div className="bg-blue-600 rounded-2xl px-8 py-16 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle, #fff 1.5px, transparent 1.5px)`,
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative max-w-xl mx-auto">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-3">Ready?</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
                Start Your Career Journey Today
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-8">
                Join thousands of tech professionals who found their next role through NamasteJobs.
                Free to use, always verified, built for India.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/jobs"
                  className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 active:scale-95 transition-all text-sm tracking-wide shadow-lg"
                >
                  Explore Opportunities →
                </Link>
                <Link
                  href="/register"
                  className="px-8 py-3.5 bg-blue-700 border border-blue-500 text-white font-bold rounded-xl hover:bg-blue-800 active:scale-95 transition-all text-sm tracking-wide"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default About;