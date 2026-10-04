import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";

export const container = "mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8";

type SectionProps = ComponentProps<"section">;

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn("relative py-16 sm:py-20 lg:py-28", className)}
      {...props}
    />
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  trailing?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  trailing,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="text-[10px] font-medium tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>

        <h2 className="mt-3 text-[1.75rem] leading-[1.08] font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>

        {description && (
          <p className="mt-4 max-w-xl text-[14px] leading-7 text-white/40 sm:text-[15px]">
            {description}
          </p>
        )}
      </div>

      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}
