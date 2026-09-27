import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  AlertTriangle,
  Camera,
  CheckCircle2,
  FileText,
  Phone,
  Search,
  Star,
} from "lucide-react";
import { Card, HomeHeader, Screen } from "@/components/app-shell";
import { profile } from "@/data/mock";
import heroCity from "@/assets/hero-city.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ร่วมใจจัดการขยะ — ประชาชนร่วมใจ ภาครัฐร่วมดูแล" },
      {
        name: "description",
        content:
          "แอปความร่วมมือด้านการจัดการขยะ แจ้งจุดทิ้งขยะ แจ้งผู้กระทำผิด ติดตามสถานะ และรับคะแนน Social Credit",
      },
      { property: "og:title", content: "ร่วมใจจัดการขยะ — ประชาชนร่วมใจ ภาครัฐร่วมดูแล" },
      {
        property: "og:description",
        content: "แจ้งปัญหาขยะในชุมชน ติดตามการแก้ไข และรับสิทธิประโยชน์จากการทำความดี",
      },
    ],
  }),
  component: Index,
});

const shortcuts = [
  { to: "/report-dump", label: "แจ้งจุดทิ้งขยะ", icon: Camera, tone: "solid" },
  { to: "/report-offender", label: "แจ้งผู้กระทำผิด", icon: AlertTriangle, tone: "danger" },
  { to: "/track", label: "ติดตามสถานะ", icon: Search, tone: "soft" },
  { to: "/social-credit", label: "Social Credit", icon: Star, tone: "warm" },
] as const;

const toneClass: Record<string, string> = {
  solid: "bg-primary text-primary-foreground",
  danger: "bg-background text-destructive border border-destructive/30",
  soft: "bg-accent text-secondary-foreground",
  warm: "bg-secondary text-secondary-foreground",
};

function Index() {
  return (
    <Screen header={<HomeHeader />}>
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={heroCity}
          alt="เมืองสะอาดและพื้นที่สีเขียว"
          width={1024}
          height={640}
          className="h-48 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent p-4">
          <p className="text-sm font-semibold text-primary">สวัสดีครับ</p>
          <h2 className="mt-1 text-xl font-extrabold leading-snug text-foreground">
            ร่วมสร้างชุมชนที่สะอาดขึ้น
            <br />
            ไปด้วยกัน
          </h2>
          <p className="mt-2 text-[12px] italic text-muted-foreground">
            “ปัญหาขยะ แก้ได้ ถ้าเราร่วมมือกัน”
          </p>
        </div>
      </div>

      <Card className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-accent/50">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
            <Award className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] text-muted-foreground">คะแนนของคุณ</p>
            <p className="text-2xl font-extrabold text-foreground">
              {profile.credit.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-xl bg-background px-3 py-2 text-center">
          <p className="text-[12px] font-bold text-primary">{profile.badge}</p>
          <p className="text-[10px] text-muted-foreground">ทำดีเพื่อชุมชน</p>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground">รายงานแล้ว</p>
            <p className="text-lg font-bold text-foreground">{profile.reported}</p>
            <p className="text-[10px] text-muted-foreground">เรื่อง</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground">แก้ไขแล้ว</p>
            <p className="text-lg font-bold text-foreground">{profile.resolved}</p>
            <p className="text-[10px] text-muted-foreground">เรื่อง</p>
          </div>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">เมนูลัด</h3>
        <div className="grid grid-cols-2 gap-3">
          {shortcuts.map(({ to, label, icon: Icon, tone }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col gap-2 rounded-2xl p-4 text-sm font-bold shadow-sm transition-transform active:scale-[0.98] ${toneClass[tone]}`}
            >
              <Icon className="h-5 w-5" />
              <span className="min-w-0 truncate">{label}</span>
            </Link>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-secondary py-3.5 text-sm font-bold text-secondary-foreground shadow-sm"
        >
          <Phone className="h-4 w-4" /> ติดต่อเจ้าหน้าที่
        </Link>
      </div>
    </Screen>
  );
}
