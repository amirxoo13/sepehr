import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Glass plate. `.panel` carries the gradient, blur, gold hairline and
 * lift shadow; the gold top edge is a separate 1px gradient so it
 * catches light along the top of the card the way a bevel would.
 */
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "panel relative overflow-hidden p-5 text-fg",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px",
        "before:bg-gradient-to-r before:from-transparent before:via-gold/45 before:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-3 flex flex-col gap-1", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-medium tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-relaxed text-muted", className)} {...props} />;
}
