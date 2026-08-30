import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-alpine-gold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-alpine-slate text-alpine-cream hover:bg-alpine-navy border border-alpine-slate",
        gold: "bg-alpine-gold text-alpine-slate hover:bg-[#b6996d] border border-alpine-gold",
        outline:
          "border border-alpine-slate/30 text-alpine-slate hover:border-alpine-gold hover:text-alpine-slate bg-transparent",
        ghost:
          "text-alpine-cream/90 hover:text-alpine-gold bg-transparent",
        outlineLight:
          "border border-alpine-cream/40 text-alpine-cream hover:border-alpine-gold hover:text-alpine-gold bg-transparent",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-5 py-2",
        lg: "h-14 px-10 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
