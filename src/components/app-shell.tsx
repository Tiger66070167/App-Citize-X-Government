import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, Bell, Home, Leaf, Map, Newspaper, Plus, User } from "lucide-react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen justify-center bg-muted px-0 py-0 sm:px-4 sm:py-8">
      <div className="relative flex w-full max-w-[420px] flex-col overflow-hidden bg-background shadow-2xl sm:rounded-[2.5rem] sm:border-8 sm:border-foreground/90">
        <div className="hidden items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold text-foreground sm:flex">
          <span>9:41</span>
          <span className="text-muted-foreground">••• ⌁ ▮</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export function PageHeader({ title, action }: { title: string; action?: ReactNode }) {
  const navigate = useNavigate();
  return (
    <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 border-b border-border bg-background px-3 py-3">
      <button
        aria-label="ย้อนกลับ"
        onClick={() => navigate({ to: "/" })}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-foreground transition-colors hover:bg-accent"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="truncate text-center text-base font-bold text-foreground">{title}</h1>
      <div className="h-9 w-9 shrink-0 place-items-center">{action}</div>
    </header>
  );
}

export function HomeHeader() {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background px-4 py-3">
      <div className="flex min-w-0 items-center gap-2">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Leaf className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-primary">ร่วมใจจัดการขยะ</p>
          <p className="truncate text-[11px] text-muted-foreground">Citizen x Government</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-foreground">
          <Bell className="h-4 w-4" />
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">
          ม
        </span>
      </div>
    </header>
  );
}

const navItems = [
  { to: "/", label: "หน้าแรก", icon: Home },
  { to: "/track", label: "แผนที่", icon: Map },
  { to: "/report-dump", label: "แจ้งเรื่อง", icon: Plus, primary: true },
  { to: "/social-credit", label: "ข่าวสาร", icon: Newspaper },
  { to: "/contact", label: "โปรไฟล์", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-10 grid grid-cols-5 items-end border-t border-border bg-background px-2 pt-2 pb-3">
      {navItems.map(({ to, label, icon: Icon, ...rest }) => {
        const primary = "primary" in rest && rest.primary;
        return (
          <Link
            key={label}
            to={to}
            className="flex flex-col items-center gap-1 text-[10px] text-muted-foreground transition-colors data-[status=active]:text-primary"
            activeOptions={{ exact: to === "/" }}
          >
            {primary ? (
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
                <Icon className="h-5 w-5" />
              </span>
            ) : (
              <Icon className="h-5 w-5" />
            )}
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Screen({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <PhoneFrame>
      {header}
      <main className="flex-1 space-y-4 overflow-y-auto bg-muted/40 px-4 py-4">{children}</main>
      <BottomNav />
    </PhoneFrame>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[13px] font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary";
