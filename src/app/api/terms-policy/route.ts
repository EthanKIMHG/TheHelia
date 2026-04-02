import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "en" ? "en" : "ko";
  const fileName =
    locale === "en" ? "termsandpolicy.en.txt" : "termsandpolicy.txt";
  const filePath = path.join(process.cwd(), "src/components", fileName);

  try {
    let termsAndPolicy: string;
    try {
      termsAndPolicy = await readFile(filePath, "utf8");
    } catch {
      const fallbackPath = path.join(
        process.cwd(),
        "src/components/termsandpolicy.txt",
      );
      termsAndPolicy = await readFile(fallbackPath, "utf8");
    }
    return new Response(termsAndPolicy, {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  } catch {
    return Response.json(
      { message: "Failed to load terms and policy." },
      { status: 500 },
    );
  }
}
