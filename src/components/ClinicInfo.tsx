import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Heart } from "lucide-react";
import { hoverSound, clickSound } from "@/lib/sound";

const hours = [
  { day: "Monday", time: "8:00 AM – 5:00 PM" },
  { day: "Tuesday – Saturday", time: "8:00 AM – 5:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export function ClinicInfo() {
  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="absolute -top-10 left-1/3 h-96 w-96 rounded-full bg-primary/15 blur-[140px]" />
      <div className="mx-auto max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">Visit Us</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold">
            Find your way to <span className="text-gradient">Medeek</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative glass-strong rounded-3xl overflow-hidden p-2 gradient-border"
          >
            <div className="relative rounded-2xl overflow-hidden h-[420px]">
              <iframe
                title="Medeek Clinic Map"
                src="https://www.google.com/maps?q=Medeek+Ambulatory+Surgical+Clinic,+4+Cabezas+St,+Bacoor,+Cavite,+Philippines&output=embed"
                loading="lazy"
                className="absolute inset-0 h-full w-full grayscale-[0.3] contrast-[1.05]"
                style={{ filter: "hue-rotate(180deg) invert(0.92)" }}
              />
              {/* Glow pin overlay */}
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-secondary blur-2xl opacity-60 animate-pulse" />
                  <div className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-primary glow-emerald">
                    <MapPin className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid gap-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              onMouseEnter={hoverSound}
              className="glass rounded-2xl p-6 gradient-border"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Address</div>
                  <p className="mt-1 font-medium leading-snug">
                    Medeek Ambulatory Surgical Clinic
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Phase 2, Bahayang Pagasa Subd, 4 Cabezas St,<br />
                    Bacoor, 4102 Cavite, Philippines
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/80">Plus Code: 9XXF+6M Bacoor</p>
                </div>
              </div>
            </motion.div>

            <motion.a
              href="tel:+639218645533"
              onClick={clickSound}
              onMouseEnter={hoverSound}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="block glass rounded-2xl p-6 gradient-border hover:bg-white/[0.07] transition"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary glow-blue">
                  <Phone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Click to Call</div>
                  <p className="mt-1 text-lg font-semibold text-gradient">+63 921 864 5533</p>
                  <p className="text-sm text-muted-foreground">Tap to call our front desk directly.</p>
                </div>
              </div>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 gradient-border"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Operating Hours</div>
                  <ul className="mt-2 divide-y divide-white/5">
                    {hours.map((h) => (
                      <li key={h.day} className="flex items-center justify-between py-2 text-sm">
                        <span className="text-foreground/90">{h.day}</span>
                        <span className="text-muted-foreground">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-5 gradient-border flex items-center gap-3"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="text-sm">
                <span className="font-semibold">LGBTQ+ Friendly</span>
                <span className="text-muted-foreground"> · safe, inclusive, and respectful care for everyone.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
