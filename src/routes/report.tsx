import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Camera,
  ChevronRight,
  Clock,
  Lightbulb,
  MapPin,
  MessageCircle,
  Star,
} from "lucide-react";
import { Card, PageHeader, Screen } from "@/components/app-shell";
import { cases } from "@/data/mock";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "แจ้งเรื่อง — ร่วมใจจัดการขยะ" },
      {
        name: "description",
        content: "เลือกประเภทเรื่องที่ต้องการแจ้ง จุดทิ้งขยะ ผู้กระทำผิด หรือปัญหาอื่นๆ",
      },
      { property: "og:title", content: "แจ้งเรื่อง — ร่วมใจจัดการขยะ" },
      {
        property: "og:description",
        content: "เลือกประเภทเรื่องที่ต้องการแจ้ง จุดทิ้งขยะ ผู้กระทำผิด หรือปัญหาอื่นๆ",
      },
    ],
  }),
  component: Report,
});

const types = [
  {
    to: "/report-dump",
    title: "แจ้งจุดทิ้งขยะ",
    detail: "ขยะล้น มีกลิ่น ต้องเพิ่มรอบเก็บ",
    points: "+50 คะแนน",
    icon: Camera,
    tone: "bg-primary text-primary-foreground",
  },
  {
    to: "/report-offender",
    title: "แจ้งผู้กระทำผิด",
    detail: "ทิ้งขยะไม่เป็นที่ พร้อมรูป/วิดีโอ",
    points: "สูงสุด +300 คะแนน",
    icon: AlertTriangle,
    tone: "bg-destructive text-destructive-foreground",
  },
  {
    to: "/contact",
    title: "แจ้งปัญหาอื่นๆ",
    detail: "ถังขยะชำรุด ขอถังเพิ่ม เรื่องทั่วไป",
    points: "+20 คะแนน",
    icon: MessageCircle,
    tone: "bg-secondary text-secondary-foreground",
  },
] as const;

const tips = [
  "ถ่ายรูปให้เห็นจุดที่เกิดปัญหาและสภาพแวดล้อมรอบๆ",
  "เปิด GPS เพื่อระบุตำแหน่งที่แม่นยำ เจ้าหน้าที่ไปถึงได้เร็วขึ้น",
  "ไม่จำเป็นต้องถ่ายใบหน้าผู้กระทำผิดในระยะใกล้ เพื่อความปลอดภัยของคุณ",
];

function Report() {
  const recent = cases.filter((c) => c.mine);

  return (
    <Screen header={<PageHeader title="แจ้งเรื่อง" />}>
      <div>
        <h2 className="text-lg font-extrabold text-foreground">วันนี้พบปัญหาอะไร?</h2>
        <p className="text-[12px] text-muted-foreground">
          เลือกประเภทเรื่องที่ต้องการแจ้ง ทุกการแจ้งที่ได้รับการยืนยันจะได้รับคะแนน
        </p>
      </div>

      <div className="space-y-3">
        {types.map(({ to, title, detail, points, icon: Icon, tone }) => (
          <Link
            key={title}
            to={to}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-transform active:scale-[0.98]"
          >
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
              <Icon className="h-6 w-6" />
            </span>
            <span className="min-w-0 space-y-0.5">
              <span className="block truncate text-[14px] font-bold text-foreground">{title}</span>
              <span className="block truncate text-[11px] text-muted-foreground">{detail}</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary">
                <Star className="h-3 w-3" /> {points}
              </span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <Link
        to="/map"
        className="flex items-center gap-3 rounded-2xl bg-accent/60 p-3 text-[12px] font-semibold text-secondary-foreground"
      >
        <MapPin className="h-5 w-5 shrink-0 text-primary" />
        <span className="min-w-0 flex-1">ดูแผนที่ว่ามีคนแจ้งจุดนี้ไปแล้วหรือยัง</span>
        <ChevronRight className="h-4 w-4 shrink-0" />
      </Link>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">เรื่องที่แจ้งล่าสุด</h3>
          <Link to="/track" className="text-[11px] font-semibold text-primary">
            ดูทั้งหมด
          </Link>
        </div>
        {recent.map((c) => (
          <Link
            key={c.id}
            to="/track"
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl bg-muted/60 px-3 py-2"
          >
            <span className="min-w-0">
              <span className="block truncate text-[12px] font-bold text-foreground">
                {c.title}
              </span>
              <span className="flex items-center gap-1 truncate text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3 shrink-0" /> {c.date}
              </span>
            </span>
            <span
              className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                c.finished ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-800"
              }`}
            >
              {c.finished ? "เสร็จสิ้น" : c.status}
            </span>
          </Link>
        ))}
      </Card>

      <Card className="space-y-2 bg-secondary/60">
        <p className="flex items-center gap-2 text-[13px] font-bold text-foreground">
          <Lightbulb className="h-4 w-4 text-primary" /> เคล็ดลับการแจ้งให้ได้ผลเร็ว
        </p>
        <ul className="space-y-1.5">
          {tips.map((t) => (
            <li key={t} className="flex gap-2 text-[11px] text-muted-foreground">
              <span className="text-primary">•</span> {t}
            </li>
          ))}
        </ul>
      </Card>
    </Screen>
  );
}
