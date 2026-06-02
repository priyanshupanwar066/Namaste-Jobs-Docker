"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import Link from "next/link";
import { User, Mail, Lock, Phone, AlertCircle, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

// ─── Namaste Icon (for branding consistency) ─────────────────────────────────
function NamasteIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" fill="none" className="text-white">
      <path d="M32 8C32 8 24 16 24 24C24 28 26 32 28 34C28 34 20 38 16 44C12 50 12 56 16 58C20 60 28 56 32 52C36 56 44 60 48 58C52 56 52 50 48 44C44 38 36 34 36 34C38 32 40 28 40 24C40 16 32 8 32 8Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 8V20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 28C20 28 24 24 32 24C40 24 44 28 44 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 44C16 44 24 40 32 40C40 40 48 44 48 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function NamasteIconSmall() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" className="text-blue-600">
      <path d="M32 8C32 8 24 16 24 24C24 28 26 32 28 34C28 34 20 38 16 44C12 50 12 56 16 58C20 60 28 56 32 52C36 56 44 60 48 58C52 56 52 50 48 44C44 38 36 34 36 34C38 32 40 28 40 24C40 16 32 8 32 8Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 8V20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 28C20 28 24 24 32 24C40 24 44 28 44 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 44C16 44 24 40 32 40C40 40 48 44 48 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", { name, email, password, phone, role });
      login(res.data.user);
      router.push("/profile");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const perks = [
    "Access 10,000+ verified job listings",
    "One-click apply to top companies",
    "Real-time application tracking",
    "Personalised job alerts via email",
  ];

  return (
    <div className="min-h-screen bg-white flex font-sans">

      {/* ── Left Panel (decorative) ──────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#fff 1.5px, transparent 1.5px)`,
            backgroundSize: `24px 24px`,
          }}
        />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <NamasteIcon />
            <span className="text-white font-black text-xl tracking-tight group-hover:opacity-90 transition-opacity">NamasteJobs</span>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-4">
            Get Started
          </p>
          <h2 className="text-3xl font-black text-white tracking-tight leading-tight mb-5">
            Join India&apos;s<br />
            <span className="text-blue-200">
              Tech Talent Hub
            </span>
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed max-w-xs mb-8">
            Create your free account and start discovering opportunities that match your skills and ambitions.
          </p>

          {/* Perks list */}
          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-blue-200" />
                </div>
                <span className="text-sm text-blue-100 font-medium">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-xs text-blue-200">
            © {new Date().getFullYear()} NamasteJobs. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Right Panel (form) ───────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50 overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="w-full max-w-md py-8"
        >
          {/* Mobile logo */}
          <motion.div variants={fadeUp} className="mb-8 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <NamasteIconSmall />
              <span className="text-slate-900 font-black text-lg tracking-tight">NamasteJobs</span>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Create Account</p>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Get started free</h1>
            <p className="text-slate-500 text-sm mb-8">Join thousands of professionals finding their dream tech role.</p>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              {error}
            </motion.div>
          )}

          <motion.form variants={stagger} onSubmit={handleRegister} className="space-y-5">

            {/* Full Name */}
            <motion.div variants={fadeUp}>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp}>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeUp}>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp}>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400 font-medium">Minimum 6 characters required</p>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp} className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm tracking-wide hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/10"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>

          {/* Sign in link */}
          <motion.p variants={fadeUp} className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Sign in →
            </Link>
          </motion.p>

          {/* Terms */}
          <motion.p variants={fadeUp} className="mt-5 text-center text-xs text-slate-400 leading-relaxed">
            By creating an account, you agree to our{" "}
            <a href="#" className="underline underline-offset-2 text-blue-600 hover:text-blue-700 transition-colors">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 text-blue-600 hover:text-blue-700 transition-colors">Privacy Policy</a>.
          </motion.p>

          {/* Mobile footer */}
          <motion.p variants={fadeUp} className="mt-8 text-center text-xs text-slate-400 lg:hidden">
            © {new Date().getFullYear()} NamasteJobs. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}