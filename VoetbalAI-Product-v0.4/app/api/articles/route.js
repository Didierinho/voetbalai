
import { NextResponse } from "next/server";
import { createArticle, getAllArticles } from "../../../lib/contentStore";

function slugify(input="") {
  return input.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,90);
}

export async function GET() {
  try {
    const articles = await getAllArticles();
    return NextResponse.json({ articles });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Titel ontbreekt." }, { status: 400 });
    }
    const slug = body.slug || `${slugify(body.title)}-${Date.now().toString().slice(-5)}`;
    const result = await createArticle({ ...body, slug });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
