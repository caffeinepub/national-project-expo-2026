import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowRight,
  LogIn,
  LogOut,
  Menu,
  Settings,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/staticData";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const isLoggedIn = !!identity;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleRegisterClick() {
    setMenuOpen(false);
    router.navigate({ to: "/register" });
  }

  function handleAdminClick() {
    setMenuOpen(false);
    router.navigate({ to: "/admin" });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "nav-glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-all group-hover:glow-emerald">
              <Zap className="w-4.5 h-4.5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-black text-sm text-foreground">
                NLP Expo{" "}
              </span>
              <span className="font-display font-black text-sm text-primary">
                2026
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.to === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(link.to);
              return (
                <Link
                  key={link.ocid}
                  to={link.to}
                  data-ocid={link.ocid}
                  className={`px-3.5 py-1.5 text-sm rounded-md transition-all duration-200 font-medium ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/8"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-primary hover:bg-primary/10 font-medium text-sm px-3 gap-1.5"
                  onClick={handleAdminClick}
                  data-ocid="nav.admin.link"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Admin
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive/70 font-medium text-sm px-3 gap-1.5"
                  onClick={() => clear()}
                  data-ocid="nav.logout.button"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 font-medium text-sm px-3 gap-1.5"
                onClick={() => login()}
                disabled={isLoggingIn}
                data-ocid="nav.admin_login.button"
              >
                <LogIn className="w-3.5 h-3.5" />
                {isLoggingIn ? "Signing in…" : "Admin"}
              </Button>
            )}
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-emerald font-display font-bold text-sm px-5"
              onClick={handleRegisterClick}
              data-ocid="nav.register_now.button"
            >
              Register Now
              <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-2xl"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.to === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(link.to);
                return (
                  <Link
                    key={link.ocid}
                    to={link.to}
                    data-ocid={link.ocid}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-all font-medium ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/8"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Admin section in mobile */}
              <div className="pt-2 border-t border-border/50 mt-2 space-y-1.5">
                {isLoggedIn ? (
                  <>
                    <button
                      type="button"
                      onClick={handleAdminClick}
                      className="flex items-center gap-2 w-full px-3 py-2.5 text-sm rounded-lg text-primary hover:bg-primary/10 font-medium transition-all"
                      data-ocid="nav.admin.link"
                    >
                      <Settings className="w-4 h-4" />
                      Admin Panel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        clear();
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2.5 text-sm rounded-lg text-destructive hover:bg-destructive/10 font-medium transition-all"
                      data-ocid="nav.logout.button"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      login();
                      setMenuOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="flex items-center gap-2 w-full px-3 py-2.5 text-sm rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 font-medium transition-all disabled:opacity-50"
                    data-ocid="nav.admin_login.button"
                  >
                    <LogIn className="w-4 h-4" />
                    {isLoggingIn ? "Signing in…" : "Admin Login"}
                  </button>
                )}
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold"
                  onClick={handleRegisterClick}
                >
                  Register Now
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
