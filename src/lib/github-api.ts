// GitHub REST API helper: PAT-аутентификация + чтение/запись content/content.json.
// Токен хранится ТОЛЬКО в браузере (localStorage). Используйте только на доверенном устройстве.

const GITHUB_API = "https://api.github.com";

export type GithubAuth = {
  pat: string;
  owner: string;
  repo: string;
  branch: string;
};

const STORAGE_KEY = "elena_admin_github_auth";

export function loadAuth(): GithubAuth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as GithubAuth) : null;
  } catch {
    return null;
  }
}

export function saveAuth(a: GithubAuth | null) {
  if (typeof window === "undefined") return;
  if (a) localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  else localStorage.removeItem(STORAGE_KEY);
}

/** Проверка доступа: пробуем прочитать content.json */
export async function verifyAuth(a: GithubAuth): Promise<{ ok: boolean; error?: string }> {
  try {
    const url = `${GITHUB_API}/repos/${a.owner}/${a.repo}/contents/content/content.json?ref=${a.branch}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${a.pat}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (res.ok) return { ok: true };
    if (res.status === 401) return { ok: false, error: "Неверный токен (PAT)." };
    if (res.status === 403)
      return { ok: false, error: "Нет прав. Проверьте, что PAT имеет scope 'repo'." };
    if (res.status === 404)
      return {
        ok: false,
        error: "Файл content/content.json не найден в репозитории. Проверьте путь и ветку.",
      };
    return { ok: false, error: `GitHub API: ${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Загрузить content.json. Возвращает { content: строка, sha } */
export async function fetchContentJson(
  a: GithubAuth
): Promise<{ content: string; sha: string }> {
  const url = `${GITHUB_API}/repos/${a.owner}/${a.repo}/contents/content/content.json?ref=${a.branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${a.pat}`,
      Accept: "application/vnd.github+json",
    },
  });
  if (!res.ok) {
    if (res.status === 401) throw new Error("Неверный токен (PAT).");
    if (res.status === 403) throw new Error("Нет прав на чтение. Проверьте scope 'repo'.");
    if (res.status === 404)
      throw new Error("Файл content/content.json не найден в репозитории.");
    throw new Error(`GitHub API: ${res.status}`);
  }
  const data = await res.json();
  // data.content — base64-кодированный JSON (UTF-8).
  // atob() возвращает строку в Latin-1, поэтому кириллицу нужно
  // сначала превратить в байты и только потом декодировать как UTF-8,
  // иначе русский текст превращается в "кракозябры".
  const bin = atob(data.content.replace(/\n/g, ""));
  const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0));
  const decoded = new TextDecoder("utf-8").decode(bytes);
  return { content: decoded, sha: data.sha as string };
}

/** Записать content.json (коммит в репо). Возвращает новый SHA */
export async function saveContentJson(
  a: GithubAuth,
  content: string,
  sha: string,
  message: string
): Promise<string> {
  const url = `${GITHUB_API}/repos/${a.owner}/${a.repo}/contents/content/content.json`;
  // UTF-8-безопасный base64
  const encoded = btoa(unescape(encodeURIComponent(content)));
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${a.pat}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: encoded,
      sha,
      branch: a.branch,
    }),
  });
  if (!res.ok) {
    if (res.status === 409)
      throw new Error(
        "Файл был изменён с момента загрузки (на GitHub уже новая версия). Перезагрузите админку и попробуйте снова."
      );
    if (res.status === 401) throw new Error("Неверный токен (PAT).");
    if (res.status === 403) throw new Error("Нет прав на запись. Проверьте scope 'repo' у PAT.");
    const err = await res.json().catch(() => ({}));
    throw new Error(`GitHub API: ${res.status} — ${err.message || ""}`);
  }
  const data = await res.json();
  return data.content.sha as string;
}
