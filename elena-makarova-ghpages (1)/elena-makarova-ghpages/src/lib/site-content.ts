// Статичный источник контента для GitHub Pages.
// Все данные — в content/content.json. Редактируется вручную в репозитории.

import contentJson from "../../content/content.json";
import type { SiteContent } from "@/lib/types";

export function getSiteContent(): SiteContent {
  return contentJson as unknown as SiteContent;
}
