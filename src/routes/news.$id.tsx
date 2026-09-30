import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { CalendarDays, Landmark, Share2 } from "lucide-react";
import { Card, PageHeader, Screen } from "@/components/app-shell";
import { news } from "@/data/mock";
import { categoryClass, newsImages } from "@/data/news-media";

export const Route = createFileRoute("/news/$id")({
  loader: ({ params }) => {
    const item = news.find((n) => n.id === params.id);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "ข่าวสาร"} — ร่วมใจจัดการขยะ` },
      { name: "description", content: loaderData?.summary ?? "" },
    ],
  }),
  component: NewsDetail,
});

function NewsDetail() {
  const item = Route.useLoaderData();
  const related = news.filter((n) => n.id !== item.id).slice(0, 2);

  return (
    <Screen
      header={
        <PageHeader
          title="ข่าวสาร"
          backTo="/news"
          action={
            <button
              aria-label="แชร์"
              onClick={() => toast.success("คัดลอกลิงก์ข่าวแล้ว")}
              className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-accent"
            >
              <Share2 className="h-4 w-4" />
            </button>
          }
        />
      }
    >
      <Card className="space-y-3 overflow-hidden p-0">
        <img
          src={newsImages[item.image]}
          alt={item.title}
          width={1024}
          height={640}
          className="h-48 w-full object-cover"
        />
        <div className="space-y-3 px-4 pb-4">
          <span
            className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${categoryClass[item.category]}`}
          >
            {item.category}
          </span>
          <h2 className="text-lg font-extrabold leading-snug text-foreground">{item.title}</h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Landmark className="h-3 w-3 text-primary" /> {item.agency}
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" /> {item.date}
            </span>
          </div>
          <p className="rounded-xl bg-accent/50 p-3 text-[13px] font-semibold text-secondary-foreground">
            {item.summary}
          </p>
          {item.body.map((para) => (
            <p key={para} className="text-[13px] leading-relaxed text-foreground">
              {para}
            </p>
          ))}
        </div>
      </Card>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-foreground">ข่าวที่เกี่ยวข้อง</h3>
        {related.map((n) => (
          <Link
            key={n.id}
            to="/news/$id"
            params={{ id: n.id }}
            className="block rounded-2xl border border-border bg-card p-3 shadow-sm"
          >
            <p className="line-clamp-2 text-[13px] font-bold text-foreground">{n.title}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">
              {n.agency} · {n.date}
            </p>
          </Link>
        ))}
      </div>
    </Screen>
  );
}
