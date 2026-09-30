import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Landmark, Truck } from "lucide-react";
import { Card, PageHeader, Screen } from "@/components/app-shell";
import { collectionSchedule, news, type NewsItem } from "@/data/mock";
import { categoryClass, newsImages } from "@/data/news-media";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "ข่าวสาร — ร่วมใจจัดการขยะ" },
      {
        name: "description",
        content: "ประกาศ กิจกรรม และความรู้ด้านการจัดการขยะจากหน่วยงานภาครัฐ",
      },
      { property: "og:title", content: "ข่าวสาร — ร่วมใจจัดการขยะ" },
      {
        property: "og:description",
        content: "ประกาศ กิจกรรม และความรู้ด้านการจัดการขยะจากหน่วยงานภาครัฐ",
      },
    ],
  }),
  component: News,
});

const tabs: ("ทั้งหมด" | NewsItem["category"])[] = ["ทั้งหมด", "ประกาศ", "กิจกรรม", "ความรู้"];

function News() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("ทั้งหมด");
  const [featured, ...rest] = news;
  const list = tab === "ทั้งหมด" ? rest : news.filter((n) => n.category === tab);

  return (
    <Screen header={<PageHeader title="ข่าวสาร" />}>
      {tab === "ทั้งหมด" && featured && (
        <Link
          to="/news/$id"
          params={{ id: featured.id }}
          className="relative block overflow-hidden rounded-2xl shadow-sm"
        >
          <img
            src={newsImages[featured.image]}
            alt={featured.title}
            width={1024}
            height={640}
            className="h-48 w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent p-4">
            <span className="mb-2 w-fit rounded-md bg-background px-2 py-0.5 text-[10px] font-bold text-destructive">
              {featured.category}
            </span>
            <p className="text-[15px] font-extrabold leading-snug text-primary-foreground">
              {featured.title}
            </p>
            <p className="mt-1 flex items-center gap-1 text-[11px] text-primary-foreground/80">
              <Landmark className="h-3 w-3" /> {featured.agency} · {featured.date}
            </p>
          </div>
        </Link>
      )}

      <Card className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-primary">
            <Truck className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-foreground">
              ตารางเก็บขยะชุมชนของคุณ
            </p>
            <p className="truncate text-[11px] text-muted-foreground">ชุมชนวัดดอนเมือง</p>
          </div>
        </div>
        <div className="divide-y divide-border rounded-xl border border-border">
          {collectionSchedule.map((s) => (
            <div
              key={s.type}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 text-[12px]"
            >
              <span className="min-w-0 truncate font-semibold text-foreground">{s.type}</span>
              <span className="shrink-0 text-muted-foreground">
                {s.day} · {s.time}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-4 gap-1 rounded-xl bg-background p-1 shadow-sm">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg py-2 text-[12px] font-bold transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((n) => (
          <Link
            key={n.id}
            to="/news/$id"
            params={{ id: n.id }}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm"
          >
            <img
              src={newsImages[n.image]}
              alt={n.title}
              loading="lazy"
              width={816}
              height={816}
              className="h-20 w-20 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 space-y-1">
              <span
                className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${categoryClass[n.category]}`}
              >
                {n.category}
              </span>
              <p className="line-clamp-2 text-[13px] font-bold leading-snug text-foreground">
                {n.title}
              </p>
              <p className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> {n.date}
                </span>
                <span className="flex min-w-0 items-center gap-1 truncate">
                  <Landmark className="h-3 w-3 shrink-0" /> {n.agency}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Screen>
  );
}
