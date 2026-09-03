import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import tzlookup from "tz-lookup";

const Input = z.object({ q: z.string().min(2).max(80) });

export const geocodePlace = createServerFn({ method: "POST" })
  .validator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", data.q);
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("limit", "5");
    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent": "SepehrAstrology/1.0 (computational astrology observatory)",
        Accept: "application/json",
      },
    });
    if (!res.ok) return { ok: false as const, results: [] };
    const json = (await res.json()) as Array<{
      display_name: string;
      lat: string;
      lon: string;
      address?: { country?: string; state?: string; city?: string; town?: string };
    }>;
    return {
      ok: true as const,
      results: json.map((r) => {
        const lat = Number(r.lat);
        const lon = Number(r.lon);
        let tz = "UTC";
        try {
          tz = tzlookup(lat, lon) || "UTC";
        } catch {
          tz = "UTC";
        }
        return {
          name: r.address?.city || r.address?.town || r.display_name.split(",")[0] || data.q,
          country: r.address?.country || "",
          admin1: r.address?.state || "",
          lat,
          lon,
          tz,
        };
      }),
    };
  });
