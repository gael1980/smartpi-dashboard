// Minimal translation layer for the SmartPI Dashboard panel.
//
// French is the source language: user-visible strings stay written in French
// in the code and are wrapped in tr("…"). Other languages map the French text to
// their own (see locales/). A missing entry falls back to the French source,
// so an incomplete catalog never hides information.
//
// Placeholders are positional: tr("Publication · {0}", value).
// Module-level tables use N_("…") to mark text for translation without
// translating it at import time; translate it where it is displayed with tr().
import {en} from "./locales/en";

export type Language = "fr" | "en";

const catalogs: Record<Exclude<Language, "fr">, Readonly<Record<string, string>>> = {en};

let current: Language = "fr";
let formatLocale = "fr-FR";
const numberFormats = new Map<string, Intl.NumberFormat>();
const dateFormats = new Map<string, Intl.DateTimeFormat>();

/** Pick the catalog from Home Assistant's language. French stays French; any other language uses English. */
export function setLanguage(language?: string | null, locale?: string | null): void {
  const code = (language ?? "").trim();
  const next: Language = code === "" || /^fr\b/i.test(code) ? "fr" : "en";
  const tag = (locale ?? code).trim() || (next === "fr" ? "fr-FR" : "en");
  let resolved = next === "fr" ? "fr-FR" : "en";
  try { resolved = Intl.getCanonicalLocales(tag)[0] ?? resolved; } catch { /* keep default */ }
  if (next === current && resolved === formatLocale) return;
  current = next;
  formatLocale = resolved;
  numberFormats.clear();
  dateFormats.clear();
}

export function language(): Language {
  return current;
}

/** BCP 47 tag for Intl formatting (dates, numbers, sorting). */
export function locale(): string {
  return formatLocale;
}

export function tr(key: string, ...args: unknown[]): string {
  const text = current === "fr" ? key : catalogs[current][key] ?? key;
  return args.length === 0 ? text : text.replace(/\{(\d+)\}/g, (match, index: string) => {
    const i = Number(index);
    return i < args.length ? String(args[i]) : match;
  });
}

/** Mark a string for translation without translating it now. */
export function N_<T extends string>(key: T): T {
  return key;
}

export function numberFormat(options: Intl.NumberFormatOptions = {}): Intl.NumberFormat {
  const id = JSON.stringify(options);
  let format = numberFormats.get(id);
  if (!format) numberFormats.set(id, format = new Intl.NumberFormat(formatLocale, options));
  return format;
}

export function dateTimeFormat(options: Intl.DateTimeFormatOptions = {}): Intl.DateTimeFormat {
  const id = JSON.stringify(options);
  let format = dateFormats.get(id);
  if (!format) dateFormats.set(id, format = new Intl.DateTimeFormat(formatLocale, options));
  return format;
}

/** Build a value once per language (e.g. tables of translated labels whose identity matters). */
export function perLanguage<T>(build: () => T): () => T {
  let builtFor = "";
  let value: T;
  return () => {
    const id = current + "|" + formatLocale;
    if (builtFor !== id) { value = build(); builtFor = id; }
    return value;
  };
}

/** Wrap a code → French label table so that reads return the current translation. */
export function translatedTable<T extends Record<string, string>>(table: T): T {
  return new Proxy(table, {get: (target, key, receiver) => {
    const value: unknown = Reflect.get(target, key, receiver);
    return typeof value === "string" ? tr(value) : value;
  }});
}
