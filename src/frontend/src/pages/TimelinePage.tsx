import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { STATIC_TIMELINE, TIMELINE_ICONS } from "../data/staticData";
import { useAllTimelineStages } from "../hooks/useQueries";

export default function TimelinePage() {
  const { data: backendTimeline } = useAllTimelineStages();
  const rawStages =
    backendTimeline && backendTimeline.length > 0
      ? backendTimeline.map((s, i) => ({
          stageName: s.stageName,
          date: s.date,
          desc: STATIC_TIMELINE[i]?.desc ?? "Stage description",
        }))
      : STATIC_TIMELINE;

  const stageIcons = TIMELINE_ICONS;

  return (
    <section id="timeline" className="py-24 relative pt-28">
      <div className="absolute inset-0 circuit-bg pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-accent/15 text-accent border-accent/40 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            Event Schedule
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight">
            Important <span className="gradient-text">Dates & Timeline</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
            Mark your calendar — stay ahead of every milestone.
          </p>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5 timeline-line sm:-translate-x-px" />

          <div className="space-y-10">
            {rawStages.map((stage, i) => {
              const Icon = stageIcons[i % stageIcons.length];
              const isLeft = i % 2 === 0;
              const isLast = i === rawStages.length - 1;

              return (
                <motion.div
                  key={`${stage.stageName}-${i}`}
                  data-ocid={`timeline.item.${i + 1}`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-4 sm:gap-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Mobile: left-aligned icon */}
                  <div className="sm:hidden flex-shrink-0 w-16 flex justify-center pt-1">
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 relative ${
                        isLast
                          ? "border-accent bg-accent/20"
                          : "border-primary bg-primary/20"
                      }`}
                    >
                      <span className="font-display font-black text-xs text-primary">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Desktop: centered numbered circle */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-4 z-10">
                    <div
                      className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-display font-black text-sm shadow-lg ${
                        isLast
                          ? "border-accent bg-accent/20 text-accent"
                          : "border-primary bg-primary/20 text-primary"
                      }`}
                      style={{
                        boxShadow: isLast
                          ? "0 0 16px oklch(0.78 0.17 78 / 0.4)"
                          : "0 0 16px oklch(0.72 0.21 160 / 0.4)",
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`flex-1 sm:w-5/12 ${
                      isLeft ? "sm:pr-16" : "sm:pl-16 sm:ml-auto"
                    }`}
                  >
                    <div className="glass-card rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                          <Icon
                            className={`w-4 h-4 ${isLast ? "text-accent" : "text-primary"}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-sm sm:text-base font-black text-foreground leading-tight">
                            {stage.stageName}
                          </h3>
                          <Badge
                            className={`mt-1.5 text-xs ${
                              isLast
                                ? "bg-accent/15 text-accent border-accent/40"
                                : "bg-primary/15 text-primary border-primary/40"
                            }`}
                          >
                            {stage.date}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden sm:block sm:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
