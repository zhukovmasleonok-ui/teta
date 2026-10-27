// Custom Image loader для GitHub Pages:
// добавляет basePath к локальным путям изображений.
// Внешние URL (http/https) не трогает.
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function imageLoader({
  src,
}: {
  src: string;
  width?: number;
  quality?: number;
}) {
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith(prefix)) return src;
  return prefix + src;
}
