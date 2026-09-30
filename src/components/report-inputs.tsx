import { useEffect, useRef, useState } from "react";
import { format, isSameDay, subDays } from "date-fns";
import { th } from "date-fns/locale";
import { CalendarDays, Check, Clock, Crosshair, Home, Loader2, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IllustratedMap } from "@/components/illustrated-map";
import { gpsFix, type MapPoint } from "@/data/mock";
import {
  formatDistance,
  formatThaiDate,
  nearbyCommunities,
  nearestPlace,
  pad,
  roundedNow,
  toLatLng,
} from "@/lib/report-helpers";
import { inputClass } from "@/components/app-shell";

const triggerClass = `${inputClass} flex items-center gap-2 text-left`;

// ---------- date ----------

export function DatePicker({
  value,
  onChange,
}: {
  value: Date | undefined;
  onChange: (d: Date) => void;
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const pick = (d: Date) => {
    onChange(d);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={triggerClass}>
        <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
        <span className={`truncate ${value ? "" : "text-muted-foreground"}`}>
          {value ? formatThaiDate(value) : "เลือกวันที่"}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <div className="flex gap-2 border-b border-border p-3">
          {[
            { label: "วันนี้", date: today },
            { label: "เมื่อวาน", date: subDays(today, 1) },
          ].map(({ label, date }) => (
            <button
              key={label}
              onClick={() => pick(date)}
              className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                value && isSameDay(value, date)
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-secondary-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <Calendar
          mode="single"
          locale={th}
          selected={value}
          onSelect={(d) => d && pick(d)}
          defaultMonth={value ?? today}
          disabled={{ after: today }}
          formatters={{
            formatCaption: (m) => `${format(m, "LLLL", { locale: th })} ${m.getFullYear() + 543}`,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

// ---------- time ----------

const hours = Array.from({ length: 24 }, (_, i) => pad(i));
const minutes = Array.from({ length: 12 }, (_, i) => pad(i * 5));

export function TimePicker({ value, onChange }: { value: string; onChange: (t: string) => void }) {
  const [open, setOpen] = useState(false);
  const [h = "", m = ""] = value.split(":");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={triggerClass}>
        <Clock className="h-4 w-4 shrink-0 text-primary" />
        <span className={`truncate ${value ? "" : "text-muted-foreground"}`}>
          {value ? `${value} น.` : "เลือกเวลา"}
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-0">
        <div className="grid grid-cols-2 border-b border-border text-center text-[11px] font-semibold text-muted-foreground">
          <span className="py-2">ชั่วโมง</span>
          <span className="py-2">นาที</span>
        </div>
        <div className="grid grid-cols-2 divide-x divide-border">
          <TimeColumn items={hours} selected={h} onPick={(v) => onChange(`${v}:${m || "00"}`)} />
          <TimeColumn
            items={minutes}
            selected={m}
            onPick={(v) => {
              onChange(`${h || "00"}:${v}`);
              setOpen(false);
            }}
          />
        </div>
        <button
          onClick={() => {
            onChange(roundedNow());
            setOpen(false);
          }}
          className="w-full border-t border-border py-2.5 text-[12px] font-bold text-primary"
        >
          ใช้เวลาปัจจุบัน
        </button>
      </PopoverContent>
    </Popover>
  );
}

function TimeColumn({
  items,
  selected,
  onPick,
}: {
  items: string[];
  selected: string;
  onPick: (v: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelector("[data-selected=true]")?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div ref={ref} className="h-48 overflow-y-auto p-1">
      {items.map((v) => (
        <button
          key={v}
          data-selected={v === selected}
          onClick={() => onPick(v)}
          className={`w-full rounded-md py-1.5 text-sm ${
            v === selected
              ? "bg-primary font-bold text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  );
}

// ---------- location ----------

export function LocationPicker({
  value,
  onChange,
}: {
  value: MapPoint | undefined;
  onChange: (p: MapPoint) => void;
}) {
  const [locating, setLocating] = useState(false);
  const place = value && nearestPlace(value);

  const locate = () => {
    setLocating(true);
    // Simulated GPS fix for the mockup
    setTimeout(() => {
      onChange(gpsFix);
      setLocating(false);
    }, 900);
  };

  return (
    <div className="space-y-2">
      <div
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          onChange({
            x: Math.round(((e.clientX - r.left) / r.width) * 100),
            y: Math.round(((e.clientY - r.top) / r.height) * 100),
          });
        }}
        className="relative h-40 cursor-crosshair overflow-hidden rounded-xl border border-border"
      >
        <IllustratedMap />
        {value ? (
          <span
            style={{ left: `${value.x}%`, top: `${value.y}%` }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full transition-all"
          >
            <MapPin className="h-8 w-8 fill-destructive text-background drop-shadow" />
          </span>
        ) : (
          <span className="absolute inset-0 grid place-items-center bg-background/40 text-[12px] font-semibold text-foreground">
            แตะบนแผนที่ หรือกดใช้ GPS
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            locate();
          }}
          className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-[11px] font-bold text-primary shadow-md"
        >
          {locating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Crosshair className="h-3.5 w-3.5" />
          )}
          {locating ? "กำลังค้นหา..." : "ใช้ตำแหน่งปัจจุบัน"}
        </button>
      </div>

      {place && value && (
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-2 rounded-xl bg-muted/60 p-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="min-w-0 text-[12px]">
            <p className="truncate font-semibold text-foreground">{place.name}</p>
            <p className="truncate text-muted-foreground">{place.area}</p>
            <p className="text-[10px] text-muted-foreground">GPS {toLatLng(value)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- community ----------

export function CommunityPicker({
  location,
  value,
  onChange,
}: {
  location: MapPoint | undefined;
  value: string;
  onChange: (name: string) => void;
}) {
  if (!location) {
    return (
      <p className="rounded-xl border border-dashed border-border px-3 py-3 text-center text-[12px] text-muted-foreground">
        ระบุสถานที่ก่อน ระบบจะแสดงชุมชนใกล้เคียงให้เลือก
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {nearbyCommunities(location).map((c) => {
        const active = c.name === value;
        return (
          <button
            key={c.name}
            type="button"
            onClick={() => onChange(c.name)}
            className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
              active ? "border-primary bg-primary/10" : "border-border bg-background"
            }`}
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                active ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
              }`}
            >
              {active ? <Check className="h-4 w-4" /> : <Home className="h-4 w-4" />}
            </span>
            <span className="min-w-0">
              <span
                className={`block truncate text-[13px] ${active ? "font-bold text-primary" : "font-semibold text-foreground"}`}
              >
                {c.name}
              </span>
              <span className="block text-[10px] text-muted-foreground">
                {c.households} ครัวเรือน
              </span>
            </span>
            <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">
              {formatDistance(c.meters)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
