import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, ChevronRight, MapPin } from "lucide-react";
import { Card, PageHeader, Screen } from "@/components/app-shell";
import { cases } from "@/data/mock";
import before from "@/assets/dump-before.jpg";
import after from "@/assets/dump-after.jpg";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "ติดตามสถานะ — ร่วมใจจัดการขยะ" },
      { name: "description", content: "ตรวจสอบความคืบหน้าการแก้ไขปัญหาขยะที่คุณแจ้งไว้ทุกขั้นตอน" },
      { property: "og:title", content: "ติดตามสถานะ — ร่วมใจจัดการขยะ" },
      {
        property: "og:description",
        content: "ตรวจสอบความคืบหน้าการแก้ไขปัญหาขยะที่คุณแจ้งไว้ทุกขั้นตอน",
      },
    ],
  }),
  component: Track,
});

function Track() {
  const [mineOnly, setMineOnly] = useState(true);
  const [openId, setOpenId] = useState("c1");
  const list = mineOnly ? cases.filter((c) => c.mine) : cases;

  return (
    <Screen header={<PageHeader title="ติดตามสถานะ" />}>
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-background p-1 shadow-sm">
        {[
          { label: "เรื่องของฉัน", value: true },
          { label: "ทั้งหมด", value: false },
        ].map(({ label, value }) => (
          <button
            key={label}
            onClick={() => setMineOnly(value)}
            className={`rounded-lg py-2 text-[13px] font-bold transition-colors ${
              mineOnly === value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {list.map((c) => {
        const open = openId === c.id;
        return (
          <Card key={c.id} className="space-y-3">
            <button
              onClick={() => setOpenId(open ? "" : c.id)}
              className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 text-left"
            >
              <img
                src={before}
                alt={c.title}
                loading="lazy"
                width={816}
                height={816}
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 space-y-1">
                <p className="truncate text-[14px] font-bold text-foreground">{c.title}</p>
                <p className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                  <MapPin className="h-3 w-3 shrink-0 text-primary" /> {c.place}
                </p>
                <p className="flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                  <CalendarDays className="h-3 w-3 shrink-0" /> {c.date}
                </p>
                <span className="inline-block rounded-md bg-accent px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                  {c.status}
                </span>
              </div>
              <ChevronRight
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                  open ? "rotate-90" : ""
                }`}
              />
            </button>

            {open && (
              <>
                <div className="grid grid-cols-4 gap-1 border-t border-border pt-3">
                  {c.steps.map((s) => (
                    <div key={s.label} className="space-y-1 text-center">
                      <span
                        className={`mx-auto grid h-7 w-7 place-items-center rounded-full text-[11px] ${
                          s.done
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {s.done ? "✓" : "•"}
                      </span>
                      <p className="text-[10px] font-semibold leading-tight text-foreground">
                        {s.label}
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        {s.date}
                        <br />
                        {s.time}
                      </p>
                    </div>
                  ))}
                </div>

                {c.finished && (
                  <div className="space-y-2 rounded-xl bg-muted/60 p-3">
                    <div className="flex items-center gap-2">
                      <figure className="min-w-0 flex-1">
                        <img
                          src={before}
                          alt="ก่อนแก้ไข"
                          loading="lazy"
                          width={816}
                          height={816}
                          className="h-24 w-full rounded-lg object-cover"
                        />
                        <figcaption className="mt-1 text-center text-[10px] text-muted-foreground">
                          ก่อน
                        </figcaption>
                      </figure>
                      <ArrowRight className="h-5 w-5 shrink-0 text-primary" />
                      <figure className="min-w-0 flex-1">
                        <img
                          src={after}
                          alt="หลังแก้ไข"
                          loading="lazy"
                          width={816}
                          height={816}
                          className="h-24 w-full rounded-lg object-cover"
                        />
                        <figcaption className="mt-1 text-center text-[10px] text-muted-foreground">
                          หลัง
                        </figcaption>
                      </figure>
                    </div>
                    <p className="flex items-center gap-2 text-[12px] font-semibold text-primary">
                      <CheckCircle2 className="h-4 w-4" /> ดำเนินการเสร็จสิ้น
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      พื้นที่ได้รับการทำความสะอาดแล้ว
                    </p>
                  </div>
                )}
              </>
            )}
          </Card>
        );
      })}
    </Screen>
  );
}
