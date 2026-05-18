"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function login(
  prevState: { error: string },
  formData: FormData
) {
  const password = formData.get("password");
  if (password === process.env.ADMIN_PASSWORD) {
    const jar = await cookies();
    jar.set("admin_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    redirect("/admin");
  }
  return { error: "Invalid password" };
}

export async function logout() {
  const jar = await cookies();
  jar.delete("admin_auth");
  redirect("/admin/login");
}

export async function updateLeadStatus(id: string, status: string) {
  const { error } = await supabase
    .from("enquiries")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function updateLeadNotes(id: string, notes: string) {
  const { error } = await supabase
    .from("enquiries")
    .update({ notes })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function updateOutboundStatus(id: string, status: string) {
  const { error } = await supabase
    .from("outbound_leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function updateOutboundNotes(id: string, notes: string) {
  const { error } = await supabase
    .from("outbound_leads")
    .update({ notes, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function updateOutboundPriority(id: string, priority: string) {
  const { error } = await supabase
    .from("outbound_leads")
    .update({ priority, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function publishContent(content: Record<string, unknown>) {
  const upserts = Object.entries(content).map(([key, value]) => ({
    key,
    value,
  }));
  const { error } = await supabase
    .from("site_config")
    .upsert(upserts, { onConflict: "key" });
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  revalidatePath("/contact");
  revalidatePath("/projects");
}
