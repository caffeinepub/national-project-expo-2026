import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { NAV_LINKS } from "../data/staticData";

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="border-t border-border py-10 bg-background relative">
      <div className="absolute inset-0 circuit-bg pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-display text-sm font-black text-foreground">
                Innovativelink-Expo 2K26
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Dept. of ECE · E.G.S.Pillay Engineering College
              </p>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.slice(0, 5).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Attribution */}
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              © {year} Innovativelink-Expo 2K26. Built with ❤️ using{" "}
              <a
                href={utmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Department of Electronics & Communication Engineering
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
