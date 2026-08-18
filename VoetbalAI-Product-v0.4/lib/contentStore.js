
import { createClient } from "@supabase/supabase-js";
import { articles as demoArticles } from "./data";

function hasSupabase() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function supabaseAdmin() {
  if (!hasSupabase()) return null;
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

export function isDatabaseLive() {
  return hasSupabase();
}

export async function getPublishedArticles() {
  if (!hasSupabase()) {
    return demoArticles.map((a, i) => ({
      ...a,
      id: `demo-${i+1}`,
      publication_status: "published",
      created_at: new Date(Date.now() - i * 3600000).toISOString(),
      body: a.intro,
      facts: [],
      analysis: "",
    }));
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("articles")
    .select("*")
    .eq("publication_status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getPublishedArticles:", error);
    return [];
  }
  return data || [];
}

export async function getAllArticles() {
  if (!hasSupabase()) {
    return demoArticles.slice(0, 6).map((a, i) => ({
      ...a,
      id: `demo-${i+1}`,
      publication_status: i < 3 ? "published" : "draft",
      created_at: new Date(Date.now() - i * 5400000).toISOString(),
      published_at: i < 3 ? new Date(Date.now() - i * 5400000).toISOString() : null,
      body: a.intro,
      facts: [],
      analysis: "",
    }));
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getArticleBySlug(slug) {
  if (!hasSupabase()) {
    const a = demoArticles.find(x => x.slug === slug);
    return a ? {...a, id:`demo-${slug}`, body:a.intro, facts:[], analysis:"", publication_status:"published"} : null;
  }

  const db = supabaseAdmin();
  const { data, error } = await db.from("articles").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function createArticle(article) {
  if (!hasSupabase()) {
    return { demo: true, article: { ...article, id: "demo-preview", publication_status: article.publication_status || "draft" } };
  }

  const db = supabaseAdmin();
  const payload = {
    slug: article.slug,
    title: article.title,
    intro: article.intro,
    body: article.body || "",
    analysis: article.analysis || "",
    facts: article.facts || [],
    category: article.category || "Nieuws",
    club: article.club || "",
    source_1: article.source1 || "",
    source_2: article.source2 || "",
    reliability_status: article.status || "",
    reliability_score: article.score || "",
    publication_status: article.publication_status || "draft",
    image_key: article.image_key || "",
    published_at: article.publication_status === "published" ? new Date().toISOString() : null,
  };

  const { data, error } = await db.from("articles").insert(payload).select("*").single();
  if (error) throw new Error(error.message);
  return { demo: false, article: data };
}

export async function updateArticleStatus(id, status) {
  if (!hasSupabase()) return { demo: true };
  const db = supabaseAdmin();
  const patch = {
    publication_status: status,
    published_at: status === "published" ? new Date().toISOString() : null
  };
  const { data, error } = await db.from("articles").update(patch).eq("id", id).select("*").single();
  if (error) throw new Error(error.message);
  return { demo: false, article: data };
}
