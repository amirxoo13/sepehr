import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "transition-[color,background-color,box-shadow,transform,opacity] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    "disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        /* Gold foil. The gradient shifts on hover so the surface reads
           as metal catching light rather than as a flat fill. */
        default: [
          "bg-[linear-gradient(135deg,var(--color-gold-bright),var(--color-gold)_45%,var(--color-gold-deep))]",
          "bg-[length:180%_180%] bg-[position:0%_50%] text-accent-fg",
          "shadow-[0_8px_24px_-12px_var(--color-gold)]",
          "hover:bg-[position:100%_50%] hover:shadow-[0_10px_30px_-10px_var(--color-gold)]",
        ].join(" "),
        secondary:
          "bg-surface-2/70 text-fg shadow-border backdrop-blur-sm hover:bg-surface-3/70 hover:shadow-[var(--shadow-glow)]",
        outline:
          "bg-transparent text-fg shadow-border hover:bg-surface-2/60 hover:text-gold",
        ghost: "text-muted hover:bg-surface-2/60 hover:text-gold",
        link: "text-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-6 text-[0.95rem]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";
