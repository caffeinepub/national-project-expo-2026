import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";

const PRIZES = [
  {
    rank: "1st",
    emoji: "🥇",
    label: "First Prize",
    amount: "₹3,000",
    gradient: "from-yellow-400/20 to-amber-500/20",
    border: "border-yellow-400/40",
    glow: "shadow-[0_0_32px_0_oklch(0.85_0.18_85/0.25)]",
    badgeCls: "bg-yellow-400/15 text-yellow-300 border-yellow-400/40",
    amountColor: "text-yellow-300",
    size: "scale-105",
    zIndex: "z-10",
  },
  {
    rank: "2nd",
    emoji: "🥈",
    label: "Second Prize",
    amount: "₹2,000",
    gradient: "from-slate-300/20 to-zinc-400/20",
    border: "border-slate-300/40",
    glow: "shadow-[0_0_24px_0_oklch(0.75_0.02_240/0.2)]",
    badgeCls: "bg-slate-300/15 text-slate-300 border-slate-300/40",
    amountColor: "text-slate-300",
    size: "",
    zIndex: "",
  },
  {
    rank: "3rd",
    emoji: "🥉",
    label: "Third Prize",
    amount: "₹1,000",
    gradient: "from-orange-400/20 to-amber-600/20",
    border: "border-orange-400/40",
    glow: "shadow-[0_0_20px_0_oklch(0.75_0.18_55/0.2)]",
    badgeCls: "bg-orange-400/15 text-orange-300 border-orange-400/40",
    amountColor: "text-orange-300",
    size: "",
    zIndex: "",
  },
];

export default function PrizesPage() {
  return (
    <section
      id="prizes"
      className="relative min-h-screen pt-28 pb-24 overflow-hidden hero-bg"
      data-ocid="prizes.section"
    >
      {/* Background effects */}
      <div className="absolute inset-0 tech-grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 circuit-bg pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-yellow-400/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge className="mb-5 bg-yellow-400/15 text-yellow-300 border-yellow-400/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5 mr-2" />
            Exciting Cash Prizes
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-4">
            <span className="gradient-text">Win Big</span>{" "}
            <span className="text-yellow-300">at Innovativelink-Expo 2K26</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Top teams will be recognised and rewarded with exciting cash prizes
            at the Final Round — Project Demonstration (Offline).
          </p>
        </motion.div>

        {/* Prize cards – 1st prize in centre on desktop, stacked on mobile */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-center md:gap-6">
          {/* 2nd – left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className={`order-2 md:order-1 w-full max-w-xs glass-card rounded-2xl p-8 border ${PRIZES[1].border} ${PRIZES[1].glow} bg-gradient-to-br ${PRIZES[1].gradient} flex flex-col items-center gap-3`}
            data-ocid="prizes.item.2"
          >
            <span className="text-5xl">{PRIZES[1].emoji}</span>
            <Badge
              className={`text-xs font-bold px-3 py-1 ${PRIZES[1].badgeCls}`}
            >
              {PRIZES[1].rank} Place
            </Badge>
            <p className="font-display font-bold text-sm text-muted-foreground uppercase tracking-widest">
              {PRIZES[1].label}
            </p>
            <p
              className={`font-display font-black text-4xl ${PRIZES[1].amountColor}`}
            >
              {PRIZES[1].amount}
            </p>
          </motion.div>

          {/* 1st – centre (elevated) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className={`order-1 md:order-2 w-full max-w-xs glass-card rounded-2xl p-10 border ${PRIZES[0].border} ${PRIZES[0].glow} bg-gradient-to-br ${PRIZES[0].gradient} flex flex-col items-center gap-3 ${PRIZES[0].size} ${PRIZES[0].zIndex}`}
            data-ocid="prizes.item.1"
          >
            <span className="text-6xl">{PRIZES[0].emoji}</span>
            <Badge
              className={`text-xs font-bold px-3 py-1 ${PRIZES[0].badgeCls}`}
            >
              {PRIZES[0].rank} Place
            </Badge>
            <p className="font-display font-bold text-sm text-muted-foreground uppercase tracking-widest">
              {PRIZES[0].label}
            </p>
            <p
              className={`font-display font-black text-5xl ${PRIZES[0].amountColor}`}
            >
              {PRIZES[0].amount}
            </p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Top Prize Winner
            </p>
          </motion.div>

          {/* 3rd – right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className={`order-3 w-full max-w-xs glass-card rounded-2xl p-8 border ${PRIZES[2].border} ${PRIZES[2].glow} bg-gradient-to-br ${PRIZES[2].gradient} flex flex-col items-center gap-3`}
            data-ocid="prizes.item.3"
          >
            <span className="text-5xl">{PRIZES[2].emoji}</span>
            <Badge
              className={`text-xs font-bold px-3 py-1 ${PRIZES[2].badgeCls}`}
            >
              {PRIZES[2].rank} Place
            </Badge>
            <p className="font-display font-bold text-sm text-muted-foreground uppercase tracking-widest">
              {PRIZES[2].label}
            </p>
            <p
              className={`font-display font-black text-4xl ${PRIZES[2].amountColor}`}
            >
              {PRIZES[2].amount}
            </p>
          </motion.div>
        </div>

        {/* Total prize pool callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-block glass-card rounded-2xl border border-primary/25 px-8 py-5">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">
              Total Prize Pool
            </p>
            <p className="font-display font-black text-3xl gradient-text">
              ₹6,000
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
