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

const isoDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
};

export async function GET() {
  const endDate = isoDate(0);

  const notificationsUrl = `https://api.nasa.gov/DONKI/notifications?startDate=${isoDate(365)}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  const notifications = await tryFetchJson(notificationsUrl);
  if (Array.isArray(notifications) && notifications.length > 0) {
    return NextResponse.json(notifications.slice(0, 30));
  }

  const flrUrl = `https://api.nasa.gov/DONKI/FLR?startDate=${isoDate(180)}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  const flr = await tryFetchJson(flrUrl);
  if (Array.isArray(flr) && flr.length > 0) {
    const mapped = flr.map((event: any) => ({
      messageType: `FLR ${event.classType || ""}`.trim(),
      messageIssueTime: event.beginTime || event.peakTime || event.endTime || null,
      messageBody: `Active Region: ${event.activeRegionNum || "N/A"} | Source: ${event.sourceLocation || "Unknown"}`,
      messageURL: event.link || null,
    }));
    return NextResponse.json(mapped.slice(0, 30));
  }

  const cmeUrl = `https://api.nasa.gov/DONKI/CME?startDate=${isoDate(120)}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  const cme = await tryFetchJson(cmeUrl);
  if (Array.isArray(cme) && cme.length > 0) {
    const mapped = cme.map((event: any) => ({
      messageType: "CME",
      messageIssueTime: event.startTime || null,
      messageBody: `Catalog: ${event.catalog || "N/A"} | Source: ${event.sourceLocation || "Unknown"}`,
      messageURL: event.link || null,
    }));
    return NextResponse.json(mapped.slice(0, 30));
  }

  return NextResponse.json([]);
}
