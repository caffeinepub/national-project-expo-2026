import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { SCREENING_ROUNDS } from "../data/staticData";

export default function ScreeningPage() {
  return (
    <section id="screening" className="py-24 relative pt-28">
      <div className="absolute inset-0 circuit-bg pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            Selection Process
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            3-Level <span className="gradient-text">Screening Process</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Our rigorous three-stage evaluation ensures only the most innovative
            and impactful projects reach the national stage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {SCREENING_ROUNDS.map((round, i) => (
            <motion.div
              key={round.number}
              data-ocid={`screening.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Arrow connector */}
              {i < 2 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 items-center">
                  <ChevronRight className="w-6 h-6 text-primary/50" />
                </div>
              )}

              <div
                className={`glass-card ${round.borderColor} rounded-2xl p-6 sm:p-7 h-full flex flex-col`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-13 h-13 w-12 h-12 rounded-xl ${round.iconBg} border border-white/10 flex items-center justify-center`}
                  >
                    <round.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-display text-5xl font-black text-white/5 select-none leading-none">
                    {round.number}
                  </span>
                </div>

                <Badge
                  className={`self-start mb-3 text-xs font-bold ${round.badgeClass}`}
                >
                  {round.subtitle}
                </Badge>
                <h3 className="font-display text-xl font-black text-foreground mb-3 leading-tight">
                  {round.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {round.description}
                </p>

                {/* Criteria list */}
                <div>
                  <p className="text-xs font-black text-primary uppercase tracking-widest mb-3">
                    Evaluation Criteria
                  </p>
                  <div className="space-y-2">
                    {round.criteria.map((c) => (
                      <div
                        key={c}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
