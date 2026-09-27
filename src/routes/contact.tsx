import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertTriangle,
  ChevronRight,
  Mail,
  MessageCircle,
  MessagesSquare,
  Phone,
  ShieldCheck,
  Landmark,
} from "lucide-react";
import { Card, PageHeader, Screen } from "@/components/app-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "ติดต่อเจ้าหน้าที่ — ร่วมใจจัดการขยะ" },
      { name: "description", content: "ช่องทางติดต่อและขอความช่วยเหลือจากเจ้าหน้าที่เทศบาล" },
      { property: "og:title", content: "ติดต่อเจ้าหน้าที่ — ร่วมใจจัดการขยะ" },
      {
        property: "og:description",
        content: "ช่องทางติดต่อและขอความช่วยเหลือจากเจ้าหน้าที่เทศบาล",
      },
    ],
  }),
  component: Contact,
});

const channels = [
  { icon: MessagesSquare, title: "แชท", detail: "พูดคุยออนไลน์" },
  { icon: Phone, title: "โทรศัพท์", detail: "0-2123-4567" },
  { icon: Mail, title: "อีเมล", detail: "city@bma.go.th" },
];

const extras = [
  { title: "แจ้งปัญหาจากตัวแอป", detail: "เช่น พบข้อผิดพลาด การใช้งานไม่ได้", icon: MessageCircle },
  {
    title: "แจ้งการข่มขู่จากผู้ถูกร้องเรียน",
    detail: "หากคุณได้รับการคุกคาม ไม่ปลอดภัย",
    icon: AlertTriangle,
  },
  { title: "ติดต่อเจ้าหน้าที่ที่เกี่ยวข้อง", detail: "ส่งเรื่องให้หน่วยงานที่รับผิดชอบ", icon: MessageCircle },
];

function Contact() {
  return (
    <Screen header={<PageHeader title="ติดต่อเจ้าหน้าที่" />}>
      <Card className="flex items-center gap-3 bg-accent/40">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-background text-primary">
          <Landmark className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold text-foreground">เทศบาลเมืองของเรา</p>
          <p className="truncate text-[11px] text-muted-foreground">ดูแลชุมชน ดูแลทุกคน</p>
        </div>
      </Card>

      <Card className="space-y-3">
        <div>
          <h2 className="text-base font-extrabold text-foreground">เราพร้อมรับฟังและดูแลคุณ</h2>
          <p className="text-[12px] text-muted-foreground">ร่วมแก้ไขปัญหา เพื่อชุมชนที่ดีขึ้น</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {channels.map(({ icon: Icon, title, detail }) => (
            <button
              key={title}
              onClick={() => toast.success(`กำลังเชื่อมต่อช่องทาง: ${title}`)}
              className="space-y-1 rounded-xl border border-border p-3 text-center"
            >
              <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-accent text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <p className="truncate text-[12px] font-bold text-foreground">{title}</p>
              <p className="truncate text-[9px] text-muted-foreground">{detail}</p>
            </button>
          ))}
        </div>
      </Card>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">แจ้งเรื่องเพิ่มเติม</h3>
        {extras.map(({ title, detail, icon: Icon }) => (
          <button
            key={title}
            onClick={() => toast.success("ส่งเรื่องให้เจ้าหน้าที่แล้ว")}
            className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left shadow-sm"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-primary">
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-bold text-foreground">{title}</span>
              <span className="block truncate text-[11px] text-muted-foreground">{detail}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>

      <Card className="space-y-2 border-destructive/30 bg-destructive/5 text-center">
        <AlertTriangle className="mx-auto h-6 w-6 text-destructive" />
        <p className="text-[13px] font-extrabold text-destructive">ขอความช่วยเหลือด่วน</p>
        <p className="text-[11px] text-muted-foreground">กรณีเกิดอันตราย หรือถูกข่มขู่</p>
        <a
          href="tel:191"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-destructive px-4 py-2 text-sm font-bold text-destructive-foreground"
        >
          <Phone className="h-4 w-4" /> โทร 191
        </a>
      </Card>

      <div className="flex items-start gap-2 px-1 pb-2">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-[11px] text-muted-foreground">
          ข้อมูลของคุณปลอดภัย เราดูแลข้อมูลส่วนบุคคลของคุณตามกฎหมาย PDPA อย่างเคร่งครัด
        </p>
      </div>
    </Screen>
  );
}
