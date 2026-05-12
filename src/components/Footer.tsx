import { Activity, Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { hoverSound, clickSound } from "@/lib/sound";

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary glow-blue">
                <Activity className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-semibold">Medeek<span className="text-gradient">.</span></span>
            </a>
            <p className="mt-5 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Medeek Ambulatory Surgical Clinic — modern outpatient surgical care delivered with compassion in Bacoor, Cavite.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Mail].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  onMouseEnter={hoverSound}
                  onClick={clickSound}
                  className="grid h-10 w-10 place-items-center rounded-xl glass hover:glow-emerald transition-shadow"
                  aria-label="Social link"
                >
                  <I className="h-4 w-4 text-foreground" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[["Home", "#home"], ["About", "#about"], ["Services", "#services"], ["Contact", "#contact"], ["Book", "#book"]].map(([l, h]) => (
                <li key={l}>
                  <a href={h} onMouseEnter={hoverSound} className="hover:text-foreground transition">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>+63 921 864 5533</li>
              <li>4 Cabezas St, Bacoor</li>
              <li>Cavite, Philippines</li>
              <li className="text-secondary">LGBTQ+ Friendly</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Medeek Ambulatory Surgical Clinic. All rights reserved.</p>
          <p>Crafted with care for our patients.</p>
        </div>
      </div>
    </footer>
  );
}
