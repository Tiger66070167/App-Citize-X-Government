import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Award,
  Bell,
  ChevronRight,
  FileText,
  Gift,
  Home,
  LogOut,
  Phone,
  Settings,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Card, PageHeader, Screen } from "@/components/app-shell";
import { levels, pointHistory, profile } from "@/data/mock";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "โปรไฟล์ — ร่วมใจจัดการขยะ" },
      { name: "description", content: "ข้อมูลของฉัน คะแนน ประวัติการแจ้ง และการตั้งค่าบัญชี" },
      { property: "og:title", content: "โปรไฟล์ — ร่วมใจจัดการขยะ" },
      {
        property: "og:description",
        content: "ข้อมูลของฉัน คะแนน ประวัติการแจ้ง และการตั้งค่าบัญชี",
      },
    ],
  }),
  component: Profile,
});

const menu = [
  {
    to: "/track",
    label: "ประวัติการแจ้งเรื่อง",
    detail: `${profile.reported} เรื่อง`,
    icon: FileText,
  },
  { to: "/social-credit", label: "คะแนนและรางวัล", detail: "แลกสิทธิประโยชน์", icon: Gift },
  { to: "/contact", label: "ติดต่อเจ้าหน้าที่", detail: "แชท โทร อีเมล", icon: Phone },
] as const;

function Profile() {
  const [notify, setNotify] = useState(true);
  const [anonymous, setAnonymous] = useState(false);

  return (
    <Screen
      header={
        <PageHeader
          title="โปรไฟล์"
          action={
            <span className="grid h-9 w-9 place-items-center text-muted-foreground">
              <Settings className="h-5 w-5" />
            </span>
          }
        />
      }
    >
      <Card className="space-y-4 bg-accent/40">
        <div className="flex items-center gap-3">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-4 border-background bg-primary/15 text-2xl font-extrabold text-primary shadow-sm">
            ม
          </span>
          <div className="min-w-0 space-y-1">
            <p className="truncate text-base font-extrabold text-foreground">{profile.name}</p>
            <p className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
              <Home className="h-3 w-3 shrink-0 text-primary" /> ชุมชนวัดดอนเมือง เขตดอนเมือง
            </p>
            <span className="inline-flex items-center gap-1 rounded-md bg-background px-2 py-0.5 text-[10px] font-bold text-primary">
              <ShieldCheck className="h-3 w-3" /> ยืนยันตัวตนแล้ว
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border rounded-xl bg-background py-3 text-center">
          {[
            { label: "คะแนน", value: profile.credit.toLocaleString() },
            { label: "รายงานแล้ว", value: profile.reported },
            { label: "แก้ไขแล้ว", value: profile.resolved },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-lg font-extrabold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">เหรียญตราของฉัน</h3>
        <div className="grid grid-cols-3 gap-2">
          {[...levels, { name: "นักแยกขยะ", detail: "ปลดล็อกที่ 2,000", active: false }].map(
            (l) => (
              <Card
                key={l.name}
                className={`space-y-1 p-3 text-center ${l.active ? "" : "opacity-50 grayscale"}`}
              >
                <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-secondary text-primary">
                  {l.active ? <Award className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                </span>
                <p className="truncate text-[11px] font-bold text-foreground">{l.name}</p>
                <p className="truncate text-[9px] text-muted-foreground">{l.detail}</p>
              </Card>
            ),
          )}
        </div>
      </div>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">ความเคลื่อนไหวคะแนน</h3>
          <Link to="/social-credit" className="text-[11px] font-semibold text-primary">
            ดูทั้งหมด
          </Link>
        </div>
        <div className="divide-y divide-border">
          {pointHistory.map((h) => (
            <div
              key={h.title}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-2"
            >
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-foreground">{h.title}</p>
                <p className="text-[10px] text-muted-foreground">{h.date}</p>
              </div>
              <span
                className={`shrink-0 text-[13px] font-extrabold ${
                  h.points > 0 ? "text-primary" : "text-destructive"
                }`}
              >
                {h.points > 0 ? "+" : ""}
                {h.points.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="space-y-2">
        {menu.map(({ to, label, detail, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-bold text-foreground">{label}</span>
              <span className="block truncate text-[11px] text-muted-foreground">{detail}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <Card className="space-y-3">
        <h3 className="text-sm font-bold text-foreground">การตั้งค่า</h3>
        <label className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <Bell className="h-4 w-4 text-primary" />
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold text-foreground">
              แจ้งเตือนสถานะเรื่อง
            </span>
            <span className="block text-[11px] text-muted-foreground">
              เมื่อเจ้าหน้าที่อัปเดตเรื่องที่คุณแจ้ง
            </span>
          </span>
          <Switch checked={notify} onCheckedChange={setNotify} />
        </label>
        <label className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="min-w-0">
            <span className="block text-[13px] font-semibold text-foreground">
              ปิดบังตัวตนเป็นค่าเริ่มต้น
            </span>
            <span className="block text-[11px] text-muted-foreground">
              ซ่อนชื่อผู้แจ้งจากผู้ถูกร้องเรียน
            </span>
          </span>
          <Switch checked={anonymous} onCheckedChange={setAnonymous} />
        </label>
      </Card>

      <button
        onClick={() => toast("ออกจากระบบแล้ว (ตัวอย่าง)")}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-background py-3 text-sm font-bold text-destructive"
      >
        <LogOut className="h-4 w-4" /> ออกจากระบบ
      </button>

      <p className="pb-2 text-center text-[10px] text-muted-foreground">
        ร่วมใจจัดการขยะ เวอร์ชัน 1.0 (Mockup) · ข้อมูลคุ้มครองตาม PDPA
      </p>
    </Screen>
  );
}
