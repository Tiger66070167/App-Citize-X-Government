import type { NewsItem } from "./mock";
import heroCity from "@/assets/hero-city.jpg";
import before from "@/assets/dump-before.jpg";
import after from "@/assets/dump-after.jpg";

export const newsImages: Record<NewsItem["image"], string> = { hero: heroCity, before, after };

export const categoryClass: Record<NewsItem["category"], string> = {
  ประกาศ: "bg-destructive/10 text-destructive",
  กิจกรรม: "bg-amber-100 text-amber-800",
  ความรู้: "bg-primary/10 text-primary",
};
