import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import DomainsPage from "./pages/DomainsPage";
import HomePage from "./pages/HomePage";
import PrizesPage from "./pages/PrizesPage";
import RegistrationPage from "./pages/RegistrationPage";
import RulesPage from "./pages/RulesPage";
import ScreeningPage from "./pages/ScreeningPage";
import TimelinePage from "./pages/TimelinePage";

// ─── Layout ───────────────────────────────────────────────────────────────────

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-right" />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const domainsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domains",
  component: DomainsPage,
});

const timelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timeline",
  component: TimelinePage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegistrationPage,
});

const screeningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/screening",
  component: ScreeningPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const prizesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prizes",
  component: PrizesPage,
});

const rulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/rules",
  component: RulesPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  domainsRoute,
  timelineRoute,
  registerRoute,
  screeningRoute,
  prizesRoute,
  rulesRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}
