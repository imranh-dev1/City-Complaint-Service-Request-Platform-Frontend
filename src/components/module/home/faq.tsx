"use client";

import { Headphones, Mail, Phone } from "lucide-react";
import Link from "next/link";

import {
  container,
  Section,
  SectionHeading,
} from "@/components/module/home/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    question: "Do I need an account to report an issue?",
    answer:
      "Yes. A verified citizen account is required because the request has to be traceable to a real person — it is what lets you track progress, receive updates and reopen a request if the problem is not actually fixed. Signing up takes about a minute and only needs a mobile number.",
  },
  {
    question: "What happens in the moment after I submit?",
    answer:
      "The platform classifies the request from the category, ward and coordinates you provided, then routes it to the department that owns that service. A department manager assigns a named officer, and you see the reference number and assigned team immediately.",
  },
  {
    question: "How is a complaint routed to the right department?",
    answer:
      "Routing is based on capability and jurisdiction, not on whoever answers the phone. A drainage blockage goes to Water & Drainage for that ward; a dead streetlight goes to Public Works. If a request is misrouted it is corrected once, and the correction is visible in the audit trail.",
  },
  {
    question: "What happens if a deadline is missed?",
    answer:
      "The SLA clock is published on the request. When it breaches, the case is escalated automatically to the department manager, then to the city commissioner if it stays unresolved, and you are told that it has been escalated rather than left to go quiet.",
  },
  {
    question: "Can I attach photos and an exact location?",
    answer:
      "Yes — photos or short video, plus a location pinned on the map or picked from your device. Location accuracy matters because it determines which ward team is dispatched. You can also add a landmark note, which is often more useful than the coordinates alone.",
  },
  {
    question: "How do I close or rate a request?",
    answer:
      "When work is marked complete you confirm whether the issue is actually resolved. A confirmation closes the case and records your rating; anything else reopens it with your reason attached and restarts the resolution clock without creating a duplicate request.",
  },
];

export default function FaqSection() {
  return (
    <Section className="border-t border-white/[0.06]">
      <div className={container}>
        <SectionHeading
          eyebrow="Questions"
          title={
            <>
              Answers before you <span className="text-white/35">have to</span>{" "}
              <span className="text-primary">ask</span>
            </>
          }
        />

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0c0e] px-5 sm:px-6"
          >
            {questions.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="py-5 text-[14px] text-white/85 hover:no-underline">
                  {item.question}
                </AccordionTrigger>

                <AccordionContent className="max-w-2xl pr-8 text-[13px] leading-6 text-white/40">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <aside className="rounded-3xl border border-white/[0.07] bg-[#0b0c0e] p-6">
            <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
              <Headphones className="size-4 text-primary" />
            </div>

            <h3 className="mt-5 text-[14px] font-medium text-white">
              Still stuck?
            </h3>

            <p className="mt-2 text-[12px] leading-5 text-white/40">
              A civic operator can take the complaint for you over the phone and
              attach it to your account, including emergencies.
            </p>

            <dl className="mt-6 space-y-4 border-t border-white/[0.07] pt-5">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-3.5 shrink-0 text-primary" />

                <div>
                  <dt className="text-[10px] tracking-[0.16em] text-white/30 uppercase">
                    24-hour helpline
                  </dt>

                  <dd>
                    <a
                      href="tel:+911234567890"
                      className="mt-1 block font-mono text-[13px] text-white/80 transition-colors hover:text-white"
                    >
                      +91 123 456 7890
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-3.5 shrink-0 text-primary" />

                <div>
                  <dt className="text-[10px] tracking-[0.16em] text-white/30 uppercase">
                    Email
                  </dt>

                  <dd>
                    <a
                      href="mailto:support@citycare.gov"
                      className="mt-1 block text-[13px] text-white/80 transition-colors hover:text-white"
                    >
                      support@citycare.gov
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <Link
              href="/help"
              className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/60 transition-colors hover:text-white"
            >
              Visit the help centre
            </Link>
          </aside>
        </div>
      </div>
    </Section>
  );
}
