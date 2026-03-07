import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { CountdownBlock, useCountdown } from "../components/CountdownBlock";
import { useEventInfo } from "../hooks/useQueries";

export default function HomePage() {
  const { data: eventInfo, isLoading: eventLoading } = useEventInfo();
  const countdown = useCountdown();
  const router = useRouter();

  function handleRegister() {
    router.navigate({ to: "/register" });
  }

  function handleLearnMore() {
    router.navigate({ to: "/about" });
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden hero-bg pt-20"
    >
      {/* Tech grid background */}
      <div className="absolute inset-0 tech-grid-bg opacity-60 pointer-events-none" />
      {/* Circuit radial glow */}
      <div className="absolute inset-0 circuit-bg pointer-events-none" />
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28 pt-16">
        <div className="max-w-4xl">
          {/* Event badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-primary/15 text-primary border-primary/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5 mr-2" />
              {eventInfo?.eventDate || "April 2026"} · National Level Event
            </Badge>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
          >
            {eventInfo?.name ? (
              <span className="gradient-text">{eventInfo.name}</span>
            ) : (
              <>
                <span className="gradient-text">Innovativelink-Expo</span>{" "}
                <span className="text-accent">2K26</span>
              </>
            )}
          </motion.h1>

          {/* Organizer line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 mb-3"
          >
            <span className="text-base sm:text-lg text-muted-foreground font-medium">
              Organized by:
            </span>
            <span className="text-base sm:text-lg text-primary font-bold">
              {eventInfo?.organizer || "Department of ECE"}
            </span>
          </motion.div>

          {/* College name */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base sm:text-lg text-foreground/75 mb-6 font-medium"
          >
            {eventLoading ? (
              <Skeleton className="h-6 w-64 rounded-md" />
            ) : (
              <span className="text-accent">
                {eventInfo?.college || "E.G.S.Pillay Engineering College"}
              </span>
            )}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            {eventInfo?.description ||
              "A platform to showcase innovative ideas, research, and technology-driven projects by young engineers."}
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-4 font-bold flex items-center gap-1.5">
              <Clock className="inline w-3.5 h-3.5 text-primary" />
              Countdown to Final Expo
            </p>
            <div className="flex flex-wrap gap-3">
              <CountdownBlock value={countdown.days} label="Days" />
              <CountdownBlock value={countdown.hours} label="Hours" />
              <CountdownBlock value={countdown.minutes} label="Minutes" />
              <CountdownBlock value={countdown.seconds} label="Seconds" />
            </div>
          </motion.div>

          {/* Cash Prizes Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-4 font-bold flex items-center gap-1.5">
              <Trophy className="inline w-3.5 h-3.5 text-yellow-400" />
              Exciting Cash Prizes
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  emoji: "🥇",
                  label: "First Prize",
                  amount: "₹3,000",
                  color: "text-yellow-300",
                  border: "border-yellow-400/35",
                  bg: "bg-yellow-400/8",
                },
                {
                  emoji: "🥈",
                  label: "Second Prize",
                  amount: "₹2,000",
                  color: "text-slate-300",
                  border: "border-slate-300/35",
                  bg: "bg-slate-300/8",
                },
                {
                  emoji: "🥉",
                  label: "Third Prize",
                  amount: "₹1,000",
                  color: "text-orange-300",
                  border: "border-orange-400/35",
                  bg: "bg-orange-400/8",
                },
              ].map((prize) => (
                <button
                  key={prize.label}
                  type="button"
                  onClick={() => router.navigate({ to: "/prizes" })}
                  data-ocid={`home.prize.item.${prize.label.split(" ")[0].toLowerCase()}`}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${prize.border} ${prize.bg} backdrop-blur-sm hover:brightness-110 transition-all cursor-pointer`}
                >
                  <span className="text-xl">{prize.emoji}</span>
                  <div className="text-left">
                    <p className="text-xs text-muted-foreground font-medium">
                      {prize.label}
                    </p>
                    <p
                      className={`font-display font-black text-base ${prize.color}`}
                    >
                      {prize.amount}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mt-10"
          >
            <Button
              size="lg"
              data-ocid="home.register_now.button"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-emerald font-display font-black text-base px-8 py-3 rounded-xl"
              onClick={handleRegister}
            >
              Register Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-ocid="home.learn_more.button"
              className="border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary/70 font-display font-bold text-base px-8 py-3 rounded-xl transition-all"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
