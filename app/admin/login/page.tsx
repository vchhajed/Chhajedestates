"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/admin";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, { error: "" });

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl p-8 w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-[#D4A017]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-[#D4A017] text-xl font-bold">C</span>
          </div>
          <h1 className="text-xl font-bold text-white mb-1">CHHAJED ESTATE</h1>
          <p className="text-gray-500 text-sm">Sign in to admin dashboard</p>
        </div>

        <form action={action} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              required
              autoFocus
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] text-white px-4 py-3 rounded-lg text-sm placeholder-gray-600 focus:border-[#D4A017] focus:outline-none transition-colors"
            />
          </div>

          {state?.error && (
            <p className="text-red-400 text-xs bg-red-400/10 px-3 py-2 rounded-lg">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#D4A017] hover:bg-[#F0C040] text-black font-semibold py-3 rounded-lg text-sm transition-colors disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
