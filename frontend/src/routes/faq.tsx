import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/faq")({
  component: FAQ,
});

const faqs = [
  {
    question: "What areas do you service?",
    answer:
      "We service Henderson, Colorado and surrounding areas within a 30-mile radius including the Denver metro area. Contact us to confirm service availability in your area.",
  },
  {
    question: "How much does cleaning cost?",
    answer:
      "Our pricing varies based on service type, property size, and frequency. We offer competitive rates starting at $89 for basic residential cleaning. Get a free quote for accurate pricing.",
  },
  {
    question: "Do you bring your own cleaning supplies?",
    answer:
      "Yes, we bring all professional-grade cleaning supplies and equipment. We use eco-friendly products that are safe for your family and pets.",
  },
  {
    question: "Are you insured and bonded?",
    answer:
      "Absolutely. We are fully licensed, insured, and bonded for your peace of mind. All our cleaners undergo background checks.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We require 24 hours notice for cancellations. Cancellations made less than 24 hours before the scheduled service may incur a fee.",
  },
  {
    question: "How do I pay for services?",
    answer:
      "We accept credit cards, debit cards, and bank transfers. Payment is processed securely online after service completion.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary pb-20 pt-24 md:pt-32">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-background px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              FAQ
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Find answers to common questions about our services.
            </p>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl bg-secondary ring-1 ring-primary/5 transition-all duration-300"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-display text-lg font-semibold">
                      {faq.question}
                    </span>
                    <span className="flex shrink-0 items-center justify-center size-8 rounded-full bg-accent/10 text-accent transition-transform duration-300">
                      <Plus
                        className={`size-4 transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}
                      />
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"}`}
                  >
                    <div className="border-t border-primary/5 px-6 pb-6 pt-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-secondary p-8 text-center ring-1 ring-primary/5">
              <p className="text-muted-foreground">
                Still have questions? We are happy to help.
              </p>
              <Button asChild className="mt-4 rounded-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
