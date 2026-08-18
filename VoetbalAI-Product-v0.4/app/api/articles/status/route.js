
import { NextResponse } from "next/server";
import { updateArticleStatus } from "../../../../lib/contentStore";

export async function POST(req) {
  try {
    const { id, status } = await req.json();
    if (!id || !["draft","published"].includes(status)) {
      return NextResponse.json({ error: "Ongeldige statuswijziging." }, { status: 400 });
    }
    const result = await updateArticleStatus(id, status);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
