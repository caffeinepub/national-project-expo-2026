import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/H6H4HMb31XzKw0ziktZSkg";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg px-3 py-2 text-sm font-semibold shadow-lg pointer-events-none select-none whitespace-nowrap"
            style={{
              background: "rgba(18, 18, 18, 0.92)",
              color: "#ffffff",
              border: "1px solid rgba(37, 211, 102, 0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            Join WhatsApp Group
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse ring */}
      <span className="relative">
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            backgroundColor: "rgba(37, 211, 102, 0.45)",
            animationDuration: "1.8s",
          }}
        />

        {/* Main button */}
        <motion.a
          href={WHATSAPP_GROUP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="whatsapp.button"
          aria-label="Join WhatsApp Group"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative flex items-center justify-center rounded-full shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400"
          style={{
            width: 58,
            height: 58,
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            boxShadow:
              "0 4px 24px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          {/* WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="30"
            height="30"
            fill="white"
            aria-hidden="true"
          >
            <path d="M16.003 2.667C8.639 2.667 2.667 8.639 2.667 16c0 2.352.636 4.556 1.748 6.452L2.667 29.333l7.1-1.724A13.277 13.277 0 0 0 16.003 29.333C23.365 29.333 29.333 23.365 29.333 16S23.365 2.667 16.003 2.667zm0 2.4c5.982 0 10.93 4.948 10.93 10.933 0 5.983-4.948 10.933-10.93 10.933a10.889 10.889 0 0 1-5.525-1.497l-.396-.238-4.115.999.977-4.014-.263-.414A10.886 10.886 0 0 1 5.07 16c0-5.985 4.948-10.933 10.933-10.933zm-3.39 5.6c-.234 0-.613.087-.935.437-.321.35-1.228 1.198-1.228 2.923 0 1.724 1.258 3.39 1.433 3.625.175.234 2.43 3.866 5.985 5.271 2.962 1.168 3.557.936 4.198.878.642-.058 2.07-.847 2.362-1.663.292-.816.292-1.516.205-1.663-.087-.146-.321-.234-.672-.409-.35-.175-2.07-1.022-2.39-1.139-.321-.117-.554-.175-.788.175-.234.35-.905 1.14-1.11 1.374-.205.234-.41.263-.76.088-.35-.175-1.479-.546-2.816-1.74-1.041-.928-1.744-2.075-1.949-2.425-.204-.35-.022-.54.154-.714.158-.157.35-.41.525-.614.175-.205.233-.35.35-.584.117-.234.059-.44-.029-.614-.087-.175-.771-1.912-1.082-2.617-.264-.601-.544-.612-.789-.624a14.98 14.98 0 0 0-.664-.005z" />
          </svg>
        </motion.a>
      </span>
    </div>
  );
}
