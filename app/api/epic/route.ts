import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const NASA_API_KEY = process.env.NASA_API_KEY || "bToFMQbJE8hFdeu9q5aWrvL1dlb8foEyjumqHQbR";

const tryFetchJson = async (url: string, timeoutMs = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

export async function GET() {
  const sources = ["natural", "enhanced"] as const;

  for (const mode of sources) {
    const url = `https://api.nasa.gov/EPIC/api/${mode}?api_key=${NASA_API_KEY}`;
    const data = await tryFetchJson(url);

    if (Array.isArray(data) && data.length > 0) {
      const items = data.slice(0, 30).map((item: any) => {
        const [datePart] = (item?.date || "").split(" ");
        const [year, month, day] = (datePart || "").split("-");
        const imageName = item?.image;
        const imageUrl =
          year && month && day && imageName
            ? `https://epic.gsfc.nasa.gov/archive/${mode}/${year}/${month}/${day}/png/${imageName}.png?api_key=${NASA_API_KEY}`
            : null;

        return { ...item, imageUrl };
      });

      return NextResponse.json({ mode, items });
    }
  }

  return NextResponse.json({ mode: "natural", items: [] });
}
