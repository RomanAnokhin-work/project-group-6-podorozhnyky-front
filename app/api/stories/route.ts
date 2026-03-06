// app/api/stories/route.ts
import { NextResponse } from "next/server";
//import { cookies } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("perPage") ?? "10";
  const category = searchParams.get("category");

  const backendUrl = process.env.NEXT_PUBLIC_API_URL; // НЕ public
  if (!backendUrl) {
    return NextResponse.json(
      { message: "BACKEND_URL is not defined" },
      { status: 500 },
    );
  }

  const qs = new URLSearchParams({ page, perPage });
  if (category) qs.set("category", category);

  const res = await fetch(`${backendUrl}/stories?${qs.toString()}`, {
    // если нужно прокинуть куки/авторизацию — потом добавим
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();

  // если бек вернул не json — отдаём как текст с кодом
  if (!contentType.includes("application/json")) {
    return new NextResponse(text, { status: res.status });
  }

  return new NextResponse(text, {
    status: res.status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: Request) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { message: "BACKEND_URL is not defined" },
      { status: 500 },
    );
  }

  const formData = await req.formData();

  // ✅ забираем cookie из запроса браузера к Next
  const cookie = req.headers.get("cookie") ?? "";

  const res = await fetch(`${backendUrl}/stories`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      cookie, // ✅ прокидываем дальше на бек
    },
    body: formData,
    cache: "no-store",
  });

  const text = await res.text();

  return new NextResponse(text, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
    },
  });
}
