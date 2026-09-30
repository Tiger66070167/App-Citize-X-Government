import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Bell, Gift, Play, Send, Video, X } from "lucide-react";
import { Card, Field, PageHeader, Screen } from "@/components/app-shell";
import { DatePicker, LocationPicker, TimePicker } from "@/components/report-inputs";
import { useNowDefaults } from "@/lib/report-helpers";
import { offenceTypes, type MapPoint } from "@/data/mock";
import clip from "@/assets/offender-clip.jpg";

export const Route = createFileRoute("/report-offender")({
  head: () => ({
    meta: [
      { title: "แจ้งผู้กระทำผิด — ร่วมใจจัดการขยะ" },
      {
        name: "description",
        content: "ส่งหลักฐานการกระทำผิดด้านความสะอาด พร้อมตัวเลือกปิดบังข้อมูลผู้แจ้ง",
      },
      { property: "og:title", content: "แจ้งผู้กระทำผิด — ร่วมใจจัดการขยะ" },
      {
        property: "og:description",
        content: "ส่งหลักฐานการกระทำผิดด้านความสะอาด พร้อมตัวเลือกปิดบังข้อมูลผู้แจ้ง",
      },
    ],
  }),
  component: ReportOffender,
});

function ReportOffender() {
  const navigate = useNavigate();
  const [media, setMedia] = useState(true);
  const [anonymous, setAnonymous] = useState(true);
  const [types, setTypes] = useState<string[]>(["ทิ้งขยะไม่เป็นที่"]);
  const [location, setLocation] = useState<MapPoint>();
  const { date, setDate, time, setTime } = useNowDefaults();

  const toggle = (name: string) =>
    setTypes((prev) => (prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]));

  return (
    <Screen header={<PageHeader title="แจ้งผู้กระทำผิด" />}>
      <Card className="space-y-4">
        <div className="relative overflow-hidden rounded-xl bg-muted">
          {media ? (
            <>
              <img
                src={clip}
                alt="หลักฐานการทิ้งขยะไม่เป็นที่"
                loading="lazy"
                width={992}
                height={672}
                className="h-44 w-full object-cover"
              />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-background/85 text-foreground">
                  <Play className="h-5 w-5" />
                </span>
              </span>
              <button
                aria-label="ลบสื่อ"
                onClick={() => setMedia(false)}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-background/90"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-lg bg-foreground/70 px-2 py-1 text-[11px] text-primary-foreground">
                <Video className="h-3.5 w-3.5" /> เพิ่มรูป/วิดีโอ
              </span>
              <span className="absolute bottom-2 right-2 rounded-lg bg-foreground/70 px-2 py-1 text-[11px] text-primary-foreground">
                00:12
              </span>
            </>
          ) : (
            <button
              onClick={() => setMedia(true)}
              className="flex h-44 w-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Video className="h-6 w-6" /> เพิ่มรูป/วิดีโอ
            </button>
          )}
        </div>

        <Field label="สถานที่" required hint="(GPS หรือแตะบนแผนที่)" as="div">
          <LocationPicker value={location} onChange={setLocation} />
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
            ประเภทการกระทำผิด <span className="text-destructive">*</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {offenceTypes.map((name) => {
              const active = types.includes(name);
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

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border p-3">
          <div className="flex min-w-0 items-start gap-2">
            <Bell className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-foreground">ปกปิดข้อมูลผู้แจ้ง</p>
              <p className="text-[11px] text-muted-foreground">ซ่อนชื่อและข้อมูลส่วนตัวของคุณ</p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={anonymous}
            onClick={() => setAnonymous((v) => !v)}
            className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors ${
              anonymous ? "bg-primary" : "bg-input"
            }`}
          >
            <span
              className={`block h-5 w-5 rounded-full bg-background transition-transform ${
                anonymous ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-accent/70 p-3 text-[12px] text-secondary-foreground">
          <Gift className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p>หากมีการยืนยันการกระทำผิด คุณจะได้รับคะแนนและรางวัลตอบแทนจากการช่วยดูแลสังคม</p>
        </div>
      </Card>

      <button
        onClick={() => {
          if (!location) {
            toast.error("กรุณาระบุสถานที่");
            return;
          }
          toast.success("ส่งหลักฐานเรียบร้อย เจ้าหน้าที่จะตรวจสอบโดยเร็ว");
          navigate({ to: "/track" });
        }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
      >
        <Send className="h-4 w-4" /> ส่งหลักฐาน
      </button>
    </Screen>
  );
}
