import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Camera, Send, X } from "lucide-react";
import { Card, Field, PageHeader, Screen } from "@/components/app-shell";
import {
  CommunityPicker,
  DatePicker,
  LocationPicker,
  TimePicker,
} from "@/components/report-inputs";
import { nearbyCommunities, useNowDefaults } from "@/lib/report-helpers";
import { dumpIssueTypes, type MapPoint } from "@/data/mock";
import dumpBefore from "@/assets/dump-before.jpg";

export const Route = createFileRoute("/report-dump")({
  head: () => ({
    meta: [
      { title: "แจ้งจุดทิ้งขยะ — ร่วมใจจัดการขยะ" },
      { name: "description", content: "รายงานจุดขยะล้นในชุมชนพร้อมรูปภาพและตำแหน่งบนแผนที่" },
      { property: "og:title", content: "แจ้งจุดทิ้งขยะ — ร่วมใจจัดการขยะ" },
      {
        property: "og:description",
        content: "รายงานจุดขยะล้นในชุมชนพร้อมรูปภาพและตำแหน่งบนแผนที่",
      },
    ],
  }),
  component: ReportDump,
});

function ReportDump() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(true);
  const [issues, setIssues] = useState<string[]>(["ขยะล้น", "มีกลิ่น"]);
  const [location, setLocation] = useState<MapPoint>();
  const [community, setCommunity] = useState("");
  const { date, setDate, time, setTime } = useNowDefaults();

  const toggle = (name: string) =>
    setIssues((prev) => (prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]));

  return (
    <Screen header={<PageHeader title="แจ้งจุดทิ้งขยะ" />}>
      <Card className="space-y-4">
        <div className="relative overflow-hidden rounded-xl bg-muted">
          {photo ? (
            <>
              <img
                src={dumpBefore}
                alt="จุดขยะล้น"
                loading="lazy"
                width={816}
                height={816}
                className="h-44 w-full object-cover"
              />
              <button
                aria-label="ลบรูป"
                onClick={() => setPhoto(false)}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/90 text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-lg bg-foreground/70 px-2 py-1 text-[11px] font-medium text-primary-foreground">
                <Camera className="h-3.5 w-3.5" /> เพิ่มรูปภาพ
              </span>
            </>
          ) : (
            <button
              onClick={() => setPhoto(true)}
              className="flex h-44 w-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Camera className="h-6 w-6" />
              เพิ่มรูปภาพ
            </button>
          )}
        </div>

        <Field label="สถานที่" required hint="(GPS หรือแตะบนแผนที่)" as="div">
          <LocationPicker
            value={location}
            onChange={(p) => {
              setLocation(p);
              setCommunity(nearbyCommunities(p)[0]?.name ?? "");
            }}
          />
        </Field>

        <Field label="ชุมชน/พื้นที่" required hint="(ใกล้ตำแหน่งที่เลือก)" as="div">
          <CommunityPicker location={location} value={community} onChange={setCommunity} />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="วันที่" required as="div">
            <DatePicker value={date} onChange={setDate} />
          </Field>
          <Field label="เวลา" required as="div">
            <TimePicker value={time} onChange={setTime} />
          </Field>
        </div>

        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-foreground">
            ลักษณะปัญหา <span className="text-muted-foreground">(เลือกได้มากกว่า 1 ข้อ)</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {dumpIssueTypes.map((name) => {
              const active = issues.includes(name);
              return (
                <button
                  key={name}
                  onClick={() => toggle(name)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-[13px] transition-colors ${
                    active
                      ? "border-primary bg-primary/10 font-semibold text-primary"
                      : "border-border bg-background text-foreground"
                  }`}
                >
                  <span
                    className={`grid h-4 w-4 shrink-0 place-items-center rounded border text-[10px] ${
                      active ? "border-primary bg-primary text-primary-foreground" : "border-input"
                    }`}
                  >
                    {active ? "✓" : ""}
                  </span>
                  <span className="min-w-0 truncate">{name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <button
        onClick={() => {
          if (!location || !community) {
            toast.error("กรุณาระบุสถานที่และชุมชน/พื้นที่");
            return;
          }
          toast.success("ส่งรายงานเรียบร้อย ขอบคุณที่ช่วยดูแลชุมชน");
          navigate({ to: "/track" });
        }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
      >
        <Send className="h-4 w-4" /> ส่งรายงาน
      </button>
    </Screen>
  );
}
