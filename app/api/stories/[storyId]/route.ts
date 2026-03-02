import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  { params }: { params: { storyId: string } },
) {
  const backendUrl = process.env.BACKEND_URL;
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

  const formData = await req.formData();

  const res = await fetch(`${backendUrl}/stories/${params.storyId}`, {
    method: "PATCH",
    body: formData,
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
