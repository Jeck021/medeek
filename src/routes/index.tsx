import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { ClinicInfo } from "@/components/ClinicInfo";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { MouseGlow } from "@/components/MouseGlow";
import { ChatAgent } from "@/components/ChatAgent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Medeek Ambulatory Surgical Clinic — Compassionate Outpatient Care" },
      {
        name: "description",
        content:
          "Modern ambulatory surgical care in Bacoor, Cavite. Same-day procedures, expert clinicians, LGBTQ+ friendly. Book a consultation today.",
      },
      { property: "og:title", content: "Medeek Ambulatory Surgical Clinic" },
      {
        property: "og:description",
        content: "Advanced outpatient surgical care with compassion — Bacoor, Cavite.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <MouseGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <ClinicInfo />
        <Booking />
      </main>
      <Footer />
      <ChatAgent />
    </div>
  );
}
