export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function isLikelyUrl(value: string) {
  try {
    const url = new URL(normalizeUrl(value));
    return Boolean(url.hostname.includes(".") && url.protocol.startsWith("http"));
  } catch {
    return false;
  }
}

export function money(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number.isFinite(value) ? value : 0);
}

export function percent(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}
