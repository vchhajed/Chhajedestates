"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export default function ContactForm({
  title = "Book a Site Visit",
  subtitle = "Fill in your details and our team will get back to you within 24 hours.",
  compact = false,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center gap-4"
      >
        <CheckCircle className="text-[#D4A017]" size={52} />
        <h3 className="font-display text-2xl text-white">Thank You!</h3>
        <p className="text-gray-400 text-sm max-w-xs">
          Your inquiry has been received. Our team will contact you within 24
          hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 text-[#D4A017] text-sm underline underline-offset-4"
        >
          Submit another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <div className={compact ? "" : "max-w-lg"}>
      {!compact && (
        <div className="mb-8">
          <h3 className="font-display text-2xl text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={compact ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "grid grid-cols-1 gap-4"}>
          <div>
            <input
              type="text"
              required
              placeholder="Your Full Name *"
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder-gray-500 text-sm px-4 py-3.5 rounded focus:border-[#D4A017] transition-colors"
            />
          </div>
          <div>
            <input
              type="tel"
              required
              placeholder="Mobile Number *"
              pattern="[6-9]{1}[0-9]{9}"
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder-gray-500 text-sm px-4 py-3.5 rounded focus:border-[#D4A017] transition-colors"
            />
          </div>
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder-gray-500 text-sm px-4 py-3.5 rounded focus:border-[#D4A017] transition-colors"
        />
        <select
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-gray-400 text-sm px-4 py-3.5 rounded focus:border-[#D4A017] transition-colors appearance-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select Project Interest
          </option>
          <option value="ranawat">Ranawat Group Project</option>
          <option value="vrindanand">Vrindanand Parshwa</option>
          <option value="vatsalya">Vatsalya Tower</option>
          <option value="emerald">Emerald Vista</option>
          <option value="kshitij">Kshitij Bibwewadi</option>
          <option value="resale">Resale Properties</option>
          <option value="other">Other</option>
        </select>
        <select
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-gray-400 text-sm px-4 py-3.5 rounded focus:border-[#D4A017] transition-colors appearance-none"
          defaultValue=""
        >
          <option value="" disabled>
            Budget Range
          </option>
          <option value="50-75">₹50L – ₹75L</option>
          <option value="75-1cr">₹75L – ₹1 Cr</option>
          <option value="1-1.5cr">₹1 Cr – ₹1.5 Cr</option>
          <option value="1.5cr+">Above ₹1.5 Cr</option>
        </select>
        <textarea
          rows={compact ? 3 : 4}
          placeholder="Your Message / Requirements"
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder-gray-500 text-sm px-4 py-3.5 rounded focus:border-[#D4A017] transition-colors resize-none"
        />
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold text-sm py-4 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </span>
          ) : (
            <>
              <Send size={15} />
              Submit Enquiry
            </>
          )}
        </motion.button>
        <p className="text-gray-600 text-xs text-center">
          By submitting, you agree to be contacted by Chhajed Estate team.
        </p>
      </form>
    </div>
  );
}
