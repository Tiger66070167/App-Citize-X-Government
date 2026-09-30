import { useEffect, useState } from "react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { communities, places, type MapPoint } from "@/data/mock";

/** 28 ก.ย. 2569 — Thai short month with Buddhist-era year */
export function formatThaiDate(d: Date) {
  return `${d.getDate()} ${format(d, "LLL", { locale: th })} ${d.getFullYear() + 543}`;
}

export const pad = (n: number) => String(n).padStart(2, "0");

export function roundedNow() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(Math.floor(d.getMinutes() / 5) * 5)}`;
}

// The illustrated map spans roughly 2 km edge to edge.
const METERS_PER_PERCENT = 20;

function distance(a: MapPoint, b: MapPoint) {
  return Math.hypot(a.x - b.x, a.y - b.y) * METERS_PER_PERCENT;
}

export function formatDistance(m: number) {
  return m < 1000 ? `${Math.round(m / 10) * 10} ม.` : `${(m / 1000).toFixed(1)} กม.`;
}

export function toLatLng({ x, y }: MapPoint) {
  return `${(13.75 + (50 - y) * 0.0004).toFixed(4)}, ${(100.6 + (x - 50) * 0.0004).toFixed(4)}`;
}

export function nearestPlace(point: MapPoint) {
  return [...places].sort((a, b) => distance(a, point) - distance(b, point))[0]!;
}

export function nearbyCommunities(point: MapPoint, limit = 3) {
  return communities
    .map((c) => ({ ...c, meters: distance(c, point) }))
    .sort((a, b) => a.meters - b.meters)
    .slice(0, limit);
}

/** Starts empty and fills "now" after mount, so SSR and client markup match. */
export function useNowDefaults() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  useEffect(() => {
    setDate(new Date());
    setTime(roundedNow());
  }, []);
  return { date, setDate, time, setTime };
}
