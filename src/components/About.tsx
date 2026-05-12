import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Cpu, Users, Sparkles } from "lucide-react";

const cards = [
  { Icon: ShieldCheck, title: "Safe Procedures", desc: "Strict sterilization and surgical safety protocols at every step." },
  { Icon: Cpu, title: "Modern Equipment", desc: "State-of-the-art ambulatory surgical technology and monitoring." },
  { Icon: Users, title: "Experienced Professionals", desc: "Board-certified surgeons and dedicated nursing specialists." },
  { Icon: Sparkles, title: "Friendly Environment", desc: "Calm, welcoming spaces designed around patient comfort." },
];

const stats = [
  { value: 12, suffix: "+", label: "Years of Service" },
  { value: 8000, suffix: "+", label: "Procedures Performed" },
  { value: 25, suffix: "+", label: "Specialists" },
  { value: 99, suffix: "%", label: "Patient Satisfaction" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">About</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            Patient-centered care, <span className="text-gradient">reimagined</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Medeek Ambulatory Surgical Clinic combines modern surgical facilities with a deeply
            human approach — every procedure designed around comfort, precision, and recovery.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative glass rounded-2xl p-6 gradient-border overflow-hidden hover:bg-white/[0.08] transition"
            >
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{ boxShadow: "var(--shadow-glow-emerald)" }} />
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary mb-5">
                <c.Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-strong rounded-2xl p-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
