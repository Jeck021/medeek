import { motion } from "framer-motion";
import { ArrowRight, Calendar, Stethoscope, HeartPulse, Activity, Plus } from "lucide-react";
import { hoverSound, clickSound } from "@/lib/sound";
import heroBg from "@/assets/hero-bg.jpg";
import { Particles } from "./Particles";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.03_250/0.4)_0%,oklch(0.16_0.03_250/0.85)_70%,var(--background)_100%)]" />

      {/* Floating orbs */}
      <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/25 blur-[140px] animate-float-slow" style={{ animationDelay: "2s" }} />

      <Particles count={40} />

      {/* Floating medical icons */}
      {[
        { Icon: Stethoscope, x: "8%", y: "22%", d: 0 },
        { Icon: HeartPulse, x: "85%", y: "30%", d: 1.2 },
        { Icon: Plus, x: "12%", y: "75%", d: 2.4 },
        { Icon: Activity, x: "82%", y: "78%", d: 0.6 },
      ].map(({ Icon, x, y, d }, i) => (
        <motion.div
          key={i}
          className="hidden md:grid absolute h-14 w-14 place-items-center rounded-2xl glass"
          style={{ left: x, top: y }}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: d, ease: "easeInOut" }}
        >
          <Icon className="h-6 w-6 text-secondary" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
          Now accepting new patients · LGBTQ+ Friendly
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight"
        >
          Advanced Outpatient
          <br />
          Surgical Care with{" "}
          <span className="text-gradient">Compassion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          Modern ambulatory surgical services delivered in a calm, technology-forward
          environment. Same-day procedures, expert clinicians, recovery you can trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#book"
            onMouseEnter={hoverSound}
            onClick={clickSound}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-blue hover:scale-[1.04] transition-transform animate-pulse-glow"
          >
            <Calendar className="h-4 w-4" />
            Book Appointment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            onMouseEnter={hoverSound}
            onClick={clickSound}
            className="group inline-flex items-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-semibold hover:bg-white/10 transition"
          >
            Explore Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="h-10 w-6 rounded-full border border-white/25 flex items-start justify-center pt-2">
          <span className="block h-2 w-1 rounded-full bg-gradient-primary animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
