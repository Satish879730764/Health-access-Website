import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[22rem]">
      <div className="shadow-phone relative rounded-[2.75rem] border-[10px] border-foreground/85 bg-card p-0">
        <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-foreground/85" />
        <div className="relative h-[40rem] overflow-hidden rounded-[2rem] bg-background">
          <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[0.7rem] font-medium text-muted-foreground">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span aria-hidden>▂▄▆</span>
              <span aria-hidden>4G</span>
              <span aria-hidden>🔋 86%</span>
            </span>
          </div>
          <div className="h-[calc(100%-1.9rem)] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
