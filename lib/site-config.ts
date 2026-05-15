import { supabase } from "./supabase";

export async function getSiteConfig<T>(key: string, fallback: T): Promise<T> {
  const { data } = await supabase
    .from("site_config")
    .select("value")
    .eq("key", key)
    .single();
  return (data?.value as T) ?? fallback;
}

export async function getAllSiteConfig(): Promise<Record<string, unknown>> {
  const { data } = await supabase.from("site_config").select("key, value");
  if (!data) return {};
  return Object.fromEntries(data.map(({ key, value }) => [key, value]));
}
