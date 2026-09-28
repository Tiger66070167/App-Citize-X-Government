import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Award, HelpCircle, Leaf, Percent, HeartHandshake, Gift } from "lucide-react";
import { Card, PageHeader, Screen } from "@/components/app-shell";
import { levels, profile, rewards } from "@/data/mock";
import heroCity from "@/assets/hero-city.jpg";

export const Route = createFileRoute("/social-credit")({
  head: () => ({
    meta: [
      { title: "Social Credit — ร่วมใจจัดการขยะ" },
      { name: "description", content: "คะแนนความดีจากการดูแลชุมชน ระดับของคุณ และรางวัลที่แลกได้" },
      { property: "og:title", content: "Social Credit — ร่วมใจจัดการขยะ" },
      {
        property: "og:description",
        content: "คะแนนความดีจากการดูแลชุมชน ระดับของคุณ และรางวัลที่แลกได้",
      },
    ],
  }),
  component: SocialCredit,
});

function SocialCredit() {
  const [credit, setCredit] = useState(profile.credit);
  const pct = Math.min(100, Math.round((credit / profile.nextLevel) * 100));

  return (
    <Screen
      header={
        <PageHeader
          title="Social Credit"
          action={
            <span className="grid h-9 w-9 place-items-center text-muted-foreground">
              <HelpCircle className="h-5 w-5" />
            </span>
          }
        />
      }
    >
      <Card className="space-y-3 overflow-hidden p-0">
        <div className="relative">
          <img
            src={heroCity}
            alt="เมืองสะอาด"
            width={1024}
            height={640}
            className="h-44 w-full object-cover"
          />
          <div className="absolute inset-0 grid place-items-center bg-background/55 text-center">
            <div>
              <Award className="mx-auto h-9 w-9 text-primary" />
              <p className="text-sm font-bold text-primary">Social Credit</p>
              <p className="text-4xl font-extrabold text-foreground">{credit.toLocaleString()}</p>
              <p className="text-[12px] text-muted-foreground">คะแนน</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 px-4 pb-4">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 text-[11px] text-muted-foreground">
            <span className="truncate">
              อีก {(profile.nextLevel - credit).toLocaleString()} คะแนน จะถึงระดับถัดไป
            </span>
            <span className="shrink-0 font-semibold text-foreground">
              {credit.toLocaleString()} / {profile.nextLevel.toLocaleString()}
            </span>
          </div>
          <p className="text-center text-[12px] text-muted-foreground">
            ทุกการมีส่วนร่วม สร้างชุมชนที่ดีกว่า
          </p>
        </div>
      </Card>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">ระดับของคุณ</h3>
        <div className="grid grid-cols-2 gap-3">
          {levels.map((l) => (
            <Card key={l.name} className="space-y-1 bg-accent/40">
              <span className="text-primary">
                {l.name === "พลเมืองดี" ? (
                  <Leaf className="h-5 w-5" />
                ) : (
                  <Award className="h-5 w-5" />
                )}
              </span>
              <p className="truncate text-[12px] font-bold text-foreground">{l.name}</p>
              <p className="text-[10px] text-muted-foreground">{l.detail}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">แลกรับรางวัล</h3>
        <div className="grid grid-cols-3 gap-2">
          {rewards.map((r) => (
            <Card key={r.title} className="space-y-1 p-3 text-center">
              <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-accent text-primary">
                {r.icon === "%" ? (
                  <Percent className="h-4 w-4" />
                ) : r.icon === "💙" ? (
                  <HeartHandshake className="h-4 w-4" />
                ) : (
                  <Gift className="h-4 w-4" />
                )}
              </span>
              <p className="truncate text-[11px] font-bold text-foreground">{r.title}</p>
              <p className="text-[9px] text-muted-foreground">{r.detail}</p>
              <button
                onClick={() => {
                  if (credit < r.cost) {
                    toast.error("คะแนนไม่เพียงพอสำหรับรางวัลนี้");
                    return;
                  }
                  setCredit((c) => c - r.cost);
                  toast.success(`แลก${r.title}สำเร็จ ใช้ ${r.cost} คะแนน`);
                }}
                className="w-full rounded-lg bg-primary/10 py-1 text-[10px] font-bold text-primary"
              >
                ใช้ {r.cost.toLocaleString()} คะแนน
              </button>
            </Card>
          ))}
        </div>
      </div>

      <Card className="flex items-start gap-3 bg-accent/40">
        <Leaf className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-foreground">ยิ่งทำดี ยิ่งได้มาก</p>
          <p className="text-[11px] text-muted-foreground">
            ร่วมเสริมสร้างสังคมสะอาด เพื่ออนาคตที่ยั่งยืน
          </p>
        </div>
      </Card>
    </Screen>
  );
}
