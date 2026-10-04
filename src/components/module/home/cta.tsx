import { ArrowUpRight, ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { container } from "@/components/module/home/section";
import { Button } from "@/components/ui/button";

const reassurance = [
  { icon: ShieldCheck, label: "Verified citizens only" },
  { icon: MapPin, label: "Auto-detected location" },
  { icon: ChevronRight, label: "Full timeline on record" },
];

export default function ReportCallToAction() {
  return (
    <section className="pb-20 sm:pb-24 lg:pb-32">
      <div className={container}>
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#08090a] px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -top-32 left-1/4 size-[420px] rounded-full bg-primary/[0.12] blur-[120px]" />

            <div className="absolute -right-24 -bottom-32 size-[380px] rounded-full bg-primary/[0.07] blur-[120px]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.05),transparent_45%)]" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-medium tracking-[0.18em] text-primary uppercase">
              Two minutes, one reference number
            </p>

            <h2 className="mt-4 text-[2rem] leading-[1.05] font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.4rem]">
              See something the city should fix?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-[14px] leading-7 text-white/40 sm:text-[15px]">
              Report it once and follow it all the way through. You will know
              which department owns it, who is working on it, and when the
              deadline to resolve it falls.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
              >
                <Link href="/complaints/new">
                  Report an issue
                  <ArrowUpRight
                    className="ml-2 size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2.2}
                  />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-white hover:bg-white/[0.07] hover:text-white"
              >
                <Link href="/complaints/track">
                  Track a request
                  <ChevronRight className="ml-1.5 size-4 text-white/40" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-white/[0.07] pt-7">
              {reassurance.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-2 text-[11px] text-white/35"
                >
                  <item.icon className="size-3.5 text-primary/70" />

                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
