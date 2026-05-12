import { motion } from "framer-motion";
import { Scissors, Stethoscope, ClipboardList, HeartPulse, Microscope, MonitorPlay } from "lucide-react";
import { hoverSound } from "@/lib/sound";

const services = [
  { Icon: Scissors, title: "Minor Surgery", desc: "Precision outpatient surgical procedures with rapid recovery." },
  { Icon: HeartPulse, title: "Ambulatory Procedures", desc: "Same-day surgical care — admission to discharge in one visit." },
  { Icon: ClipboardList, title: "Pre-operative Consultation", desc: "Personalized assessments to plan a safe procedure." },
  { Icon: Stethoscope, title: "Post-operative Care", desc: "Structured follow-up and recovery support." },
  { Icon: Microscope, title: "Diagnostic Support", desc: "Accurate imaging and lab coordination on site." },
  { Icon: MonitorPlay, title: "Patient Monitoring", desc: "Continuous vitals monitoring during and after care." },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 px-6">
      <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-secondary/15 blur-[140px]" />
      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">Services</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            Comprehensive <span className="text-gradient">surgical care</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            From consultation to recovery — every service is built around your safety, comfort, and outcomes.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -10 }}
              onMouseEnter={hoverSound}
              className="group relative rounded-3xl p-7 glass gradient-border overflow-hidden cursor-pointer"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.78 0.17 165 / 0.18), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary mb-6 group-hover:glow-emerald transition-shadow">
                  <s.Icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  Learn more →
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
