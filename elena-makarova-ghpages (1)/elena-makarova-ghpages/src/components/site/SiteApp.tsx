"use client";

import { useMemo } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SiteProvider, useSite } from "@/lib/site-context";
import { HomeView } from "@/components/site/views/HomeView";
import { StartView } from "@/components/site/views/StartView";
import { TrainingsView } from "@/components/site/views/TrainingsView";
import { TrainingDetailView } from "@/components/site/views/TrainingDetailView";
import { ThetaView } from "@/components/site/views/ThetaView";
import { SeasonView } from "@/components/site/views/SeasonView";
import { ReviewsView } from "@/components/site/views/ReviewsView";
import { ContactsView } from "@/components/site/views/ContactsView";
import type { SiteContent } from "@/lib/types";

function Router() {
  const { route } = useSite();
  const view = useMemo(() => {
    if (route === "/" || route === "") return <HomeView />;
    if (route === "/start") return <StartView />;
    if (route === "/trainings") return <TrainingsView />;
    if (route.startsWith("/training/")) {
      const slug = route.slice("/training/".length);
      return <TrainingDetailView slug={decodeURIComponent(slug)} />;
    }
    if (route === "/thetahealing") return <ThetaView />;
    if (route === "/season") return <SeasonView />;
    if (route === "/reviews") return <ReviewsView />;
    if (route === "/contacts") return <ContactsView />;
    return <HomeView />;
  }, [route]);

  return (
    <div className="flex min-h-screen flex-col bg-milk">
      <Header />
      <main className="flex-1">{view}</main>
      <Footer />
    </div>
  );
}

export default function SiteApp({ initialContent }: { initialContent: SiteContent }) {
  return (
    <SiteProvider initialContent={initialContent}>
      <Router />
    </SiteProvider>
  );
}
