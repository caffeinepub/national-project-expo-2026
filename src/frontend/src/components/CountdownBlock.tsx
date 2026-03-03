import { useEffect, useState } from "react";
import { EVENT_DATE } from "../data/staticData";

// ─── Countdown Hook ───────────────────────────────────────────────────────────

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculate() {
      const now = new Date();
      const diff = EVENT_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

// ─── CountdownBlock Component ─────────────────────────────────────────────────

interface CountdownBlockProps {
  value: number;
  label: string;
}

export function CountdownBlock({ value, label }: CountdownBlockProps) {
  return (
    <div className="countdown-block rounded-2xl px-5 py-4 text-center min-w-[80px] sm:min-w-[96px]">
      <div className="font-display text-3xl sm:text-4xl font-black text-primary text-glow-emerald tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs text-muted-foreground mt-2 uppercase tracking-[0.15em] font-medium">
        {label}
      </div>
    </div>
  );
}
