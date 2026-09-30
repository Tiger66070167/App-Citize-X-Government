import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Crosshair,
  MapPin,
  Recycle,
  Search,
  Trash2,
} from "lucide-react";
import { Card, PageHeader, Screen, inputClass } from "@/components/app-shell";
import { IllustratedMap } from "@/components/illustrated-map";
import { mapPins, type MapPinKind } from "@/data/mock";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "แผนที่ — ร่วมใจจัดการขยะ" },
      {
        name: "description",
        content: "แผนที่จุดปัญหาขยะ เรื่องที่แจ้ง และจุดทิ้งขยะในชุมชนของคุณ",
      },
      { property: "og:title", content: "แผนที่ — ร่วมใจจัดการขยะ" },
      {
        property: "og:description",
        content: "แผนที่จุดปัญหาขยะ เรื่องที่แจ้ง และจุดทิ้งขยะในชุมชนของคุณ",
      },
    ],
  }),
  component: MapPage,
});

const kinds: Record<MapPinKind, { label: string; icon: typeof MapPin; pin: string; chip: string }> =
  {
    dump: {
      label: "จุดขยะ",
      icon: Trash2,
      pin: "bg-amber-500 text-white",
      chip: "bg-amber-100 text-amber-800",
    },
    offender: {
      label: "ผู้กระทำผิด",
      icon: AlertTriangle,
      pin: "bg-destructive text-destructive-foreground",
      chip: "bg-destructive/10 text-destructive",
    },
    done: {
      label: "แก้ไขแล้ว",
      icon: CheckCircle2,
      pin: "bg-primary text-primary-foreground",
      chip: "bg-primary/10 text-primary",
    },
    bin: {
      label: "จุดทิ้งขยะ",
      icon: Recycle,
      pin: "bg-sky-500 text-white",
      chip: "bg-sky-100 text-sky-800",
    },
  };

const filters: { value: MapPinKind | "all"; label: string }[] = [
  { value: "all", label: "ทั้งหมด" },
  { value: "dump", label: kinds.dump.label },
  { value: "offender", label: kinds.offender.label },
  { value: "done", label: kinds.done.label },
  { value: "bin", label: kinds.bin.label },
];

function MapPage() {
  const [filter, setFilter] = useState<MapPinKind | "all">("all");
  const [selectedId, setSelectedId] = useState("c2");
  const pins = filter === "all" ? mapPins : mapPins.filter((p) => p.kind === filter);
  const selected = pins.find((p) => p.id === selectedId);

  return (
    <Screen header={<PageHeader title="แผนที่" />}>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input className={`${inputClass} pl-9`} placeholder="ค้นหาสถานที่ ชุมชน หรือถนน" />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
              filter === value
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative h-80 overflow-hidden rounded-2xl border border-border shadow-sm">
        <IllustratedMap />

        {pins.map((p) => {
          const { icon: Icon, pin } = kinds[p.kind];
          const active = p.id === selectedId;
          return (
            <button
              key={p.id}
              aria-label={p.title}
              onClick={() => setSelectedId(p.id)}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-full transition-transform ${
                active ? "z-10 scale-125" : ""
              }`}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-full rounded-br-none rotate-45 border-2 border-background shadow-md ${pin}`}
              >
                <Icon className="h-4 w-4 -rotate-45" />
              </span>
            </button>
          );
        })}

        {/* Current location */}
        <span className="absolute left-[48%] top-[48%] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 animate-ping rounded-full bg-sky-400/60" />
          <span className="relative block h-4 w-4 rounded-full border-2 border-background bg-sky-500 shadow" />
        </span>

        <button
          aria-label="ตำแหน่งของฉัน"
          className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-background text-primary shadow-md"
        >
          <Crosshair className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 px-1">
        {Object.values(kinds).map(({ label, pin }) => (
          <span key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className={`h-2.5 w-2.5 rounded-full ${pin}`} /> {label}
          </span>
        ))}
      </div>

      {selected ? (
        <Card className="space-y-3">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${kinds[selected.kind].chip}`}
            >
              {(() => {
                const Icon = kinds[selected.kind].icon;
                return <Icon className="h-5 w-5" />;
              })()}
            </span>
            <div className="min-w-0 space-y-1">
              <p className="truncate text-[14px] font-bold text-foreground">{selected.title}</p>
              <p className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0 text-primary" /> {selected.place}
              </p>
              {selected.date && (
                <p className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                  <CalendarDays className="h-3 w-3 shrink-0" /> {selected.date}
                </p>
              )}
              <span
                className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold ${kinds[selected.kind].chip}`}
              >
                {selected.status}
              </span>
            </div>
          </div>
          {selected.kind === "bin" ? (
            <p className="rounded-xl bg-muted/60 p-3 text-[11px] text-muted-foreground">
              จุดบริการของเทศบาล นำขยะที่แยกแล้วมาทิ้งได้ตามเวลาที่กำหนด
            </p>
          ) : (
            <Link
              to="/track"
              className="flex items-center justify-between rounded-xl bg-primary/10 px-3 py-2.5 text-[12px] font-bold text-primary"
            >
              ดูรายละเอียดและสถานะ <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </Card>
      ) : (
        <Card className="text-center text-[12px] text-muted-foreground">
          แตะที่หมุดบนแผนที่เพื่อดูรายละเอียด
        </Card>
      )}

      <Link
        to="/report"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-md"
      >
        <MapPin className="h-4 w-4" /> แจ้งปัญหาที่ตำแหน่งนี้
      </Link>
    </Screen>
  );
}
