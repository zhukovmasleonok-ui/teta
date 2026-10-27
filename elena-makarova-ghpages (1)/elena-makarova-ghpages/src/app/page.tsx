import SiteApp from "@/components/site/SiteApp";
import { getSiteContent } from "@/lib/site-content";

export default function Page() {
  const content = getSiteContent();
  return <SiteApp initialContent={content} />;
}
