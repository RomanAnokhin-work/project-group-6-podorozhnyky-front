import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { message: "BACKEND_URL is not defined" },
      { status: 500 },
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Missing access token" },
      { status: 401 },
    );
  }

  // Забираем форму от клиента (img/title/category/article)
  const formData = await req.formData();

  // Проксируем на бекенд
  const res = await fetch(`${backendUrl}/stories`, {
    method: "POST",
    body: formData,
    // ВАЖНО: НЕ ставим Content-Type вручную для FormData — fetch сам добавит boundary
    headers: {
      Accept: "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
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
