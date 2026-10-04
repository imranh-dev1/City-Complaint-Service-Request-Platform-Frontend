import CityComplaintBanner from "@/components/module/home/Banner";
import ServiceCategories from "@/components/module/home/categories";
import ReportCallToAction from "@/components/module/home/cta";
import DepartmentDirectory from "@/components/module/home/departments";
import FaqSection from "@/components/module/home/faq";
import CitizenFeedback from "@/components/module/home/feedback";
import CityImpact from "@/components/module/home/impact";
import RequestLifecycle from "@/components/module/home/lifecycle";
import LiveRequestBoard from "@/components/module/home/live-board";
import {
  container,
  Section,
  SectionHeading,
} from "@/components/module/home/section";
import SlaCommitments from "@/components/module/home/sla";

export default function HomePage() {
  return (
    <>
      <CityComplaintBanner />

      <ServiceCategories />

      <RequestLifecycle />

      <Section className="border-t border-white/[0.06]">
        <div className={container}>
          <SectionHeading
            eyebrow="On the ground right now"
            title={
              <>
                Watch requests <span className="text-white/35">move</span> as{" "}
                <span className="text-primary">they happen</span>
              </>
            }
            description="A public view of live civic requests across the city — the same status your own dashboard shows, published openly so the work is visible to everyone."
            trailing={
              <div className="flex items-center gap-2 rounded-full border border-white/[0.08] px-3 py-1.5">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />

                <span className="text-[11px] text-white/40">
                  Updated 2 minutes ago
                </span>
              </div>
            }
          />

          <div className="mt-12 lg:mt-16">
            <LiveRequestBoard />
          </div>
        </div>
      </Section>

      <DepartmentDirectory />

      <CityImpact />

      <SlaCommitments />

      <CitizenFeedback />

      <FaqSection />

      <ReportCallToAction />
    </>
  );
}
