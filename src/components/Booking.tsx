import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { hoverSound, clickSound } from "@/lib/sound";

const services = ["Minor Surgery", "Ambulatory Procedure", "Pre-op Consultation", "Post-op Care", "Diagnostic", "Other"];

export function Booking() {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", service: services[0], notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clickSound();
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", date: "", service: services[0], notes: "" });
    setTimeout(() => setSuccess(false), 4500);
  };

  const field =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/60 outline-none transition-all focus:border-secondary/60 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_oklch(0.78_0.17_165/0.15)]";

  return (
    <section id="book" className="relative py-28 px-6">
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-secondary/15 blur-[140px]" />
      <div className="mx-auto max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">Book</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            Schedule your <span className="text-gradient">consultation</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Share a few details — our care team will reach out to confirm your appointment.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 glass-strong gradient-border rounded-3xl p-7 md:p-10 grid gap-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Full Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${field} mt-2`} placeholder="Juan Dela Cruz" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`${field} mt-2`} placeholder="you@email.com" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Phone</label>
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`${field} mt-2`} placeholder="+63 ..." />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Preferred Date</label>
              <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={`${field} mt-2`} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Service</label>
              <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={`${field} mt-2`}>
                {services.map((s) => <option key={s} className="bg-background">{s}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Notes (optional)</label>
              <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={`${field} mt-2 resize-none`} placeholder="Tell us anything we should know..." />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              onMouseEnter={hoverSound}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-blue hover:scale-[1.04] transition-transform animate-pulse-glow"
            >
              <Send className="h-4 w-4" />
              Schedule Consultation
            </button>
          </div>
        </motion.form>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] glass-strong gradient-border rounded-2xl px-5 py-4 flex items-center gap-3 glow-emerald"
          >
            <CheckCircle2 className="h-5 w-5 text-secondary" />
            <div className="text-sm">
              <div className="font-semibold">Request received</div>
              <div className="text-muted-foreground text-xs">We'll contact you shortly to confirm.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
