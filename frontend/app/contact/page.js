"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

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

// ─── Input Component ──────────────────────────────────────────────────────────
function Field({ label, error, children, required }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full px-4 py-3 bg-slate-50 border ${
    hasError ? "border-red-300 bg-red-50/30" : "border-slate-200"
  } rounded-xl text-sm text-slate-800 placeholder-slate-400 font-medium
  focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
  transition-all duration-200`;

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      const response = await axios.post("/api/contact", {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      if (response.data.success) {
        setSubmitStatus({ success: true, message: response.data.message });
        reset();
      }
    } catch (error) {
      console.error("Client Error:", error);
      setSubmitStatus({
        success: false,
        message:
          error.response?.data?.message ||
          "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "priyanshupanwar841@gmail.com",
      href: "mailto:priyanshupanwar841@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 70780 41562",
      href: "tel:+917078041562",
    },
    {
      icon: MapPin,
      label: "Office",
      value: "123 Business Street, Saharanpur, Uttar Pradesh — 247001",
      href: null,
    },
  ];

  const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Hero Header ─────────────────────────────────────────────── */}
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
            className="max-w-2xl mx-auto"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <NamasteIconLarge />
            </motion.div>
            <motion.p variants={fadeUp} className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">
              Contact Us
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-5">
              We&apos;d Love to{" "}
              <span className="text-blue-600">
                Hear From You
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
              Have a question, feedback, or partnership inquiry? Our team is ready to help
              you navigate your career journey.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: Contact Info ─────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Info Card */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200 p-8 flex-1 hover:border-blue-200 transition-all duration-300">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Reach Out</p>
              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <item.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-slate-700 font-medium hover:text-blue-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-700 font-medium leading-relaxed">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="my-8 border-t border-slate-100" />

              {/* Socials */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all"
                    >
                      <s.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Response time badge */}
            <motion.div variants={fadeUp} className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-800">Typically replies within 24 hours</p>
                  <p className="text-xs text-slate-500 mt-0.5">Mon – Fri, 9 AM – 6 PM IST</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Contact Form ────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Send a Message</p>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">
                Get in Touch
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" error={errors.name?.message} required>
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      id="name"
                      className={inputClass(!!errors.name)}
                      placeholder="Your full name"
                    />
                  </Field>

                  <Field label="Email Address" error={errors.email?.message} required>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      id="email"
                      className={inputClass(!!errors.email)}
                      placeholder="you@example.com"
                    />
                  </Field>
                </div>

                <Field label="Subject" error={errors.subject?.message} required>
                  <input
                    {...register("subject", { required: "Subject is required" })}
                    type="text"
                    id="subject"
                    className={inputClass(!!errors.subject)}
                    placeholder="What's this about?"
                  />
                </Field>

                <Field label="Message" error={errors.message?.message} required>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 20,
                        message: "Message must be at least 20 characters",
                      },
                    })}
                    id="message"
                    rows={5}
                    className={`${inputClass(!!errors.message)} resize-none`}
                    placeholder="Tell us how we can help you…"
                  />
                </Field>

                {/* Status Message */}
                {submitStatus.message && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-xl text-sm font-medium ${
                      submitStatus.success
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {submitStatus.success ? (
                      <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    )}
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl
                  hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed
                  text-sm tracking-wide shadow-lg shadow-blue-600/10"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ── Map ───────────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mt-6 pb-16"
        >
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-200 transition-all duration-300">
            <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
              <MapPin className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-bold text-slate-800">Our Location</p>
                <p className="text-xs text-slate-500">Saharanpur, Uttar Pradesh, India</p>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.432125867688!2d77.54031431510262!3d29.394239482123234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c149991a82b1f%3A0x5d3e8a6b2e3e3b7a!2sSaharanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v162987654321!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              title="Office Location"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}