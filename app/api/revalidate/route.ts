import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    revalidateTag("products");

    return Response.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
