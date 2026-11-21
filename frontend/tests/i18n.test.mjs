import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync, readdirSync, statSync} from "node:fs";
import {join} from "node:path";
import {fileURLToPath} from "node:url";
import {setLanguage, language, locale, tr, N_, numberFormat, perLanguage, translatedTable} from "../.build-tests/i18n.mjs";
import {en} from "../.build-tests/locales/en.mjs";
import {display} from "../.build-tests/adapter.mjs";

const src = fileURLToPath(new URL("../src/", import.meta.url));
const placeholders = (text) => [...text.matchAll(/\{\d+\}/g)].map((m) => m[0]).sort().join();

function sourceKeys() {
  const keys = new Set();
  (function walk(dir) {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) { if (name !== "locales") walk(path); continue; }
      if (!path.endsWith(".ts") || path.endsWith("i18n.ts")) continue;
      for (const match of readFileSync(path, "utf8").matchAll(/\b(?:tr|N_)\(\s*("(?:[^"\\]|\\.)*")/g)) keys.add(JSON.parse(match[1]));
    }
  })(src);
  return keys;
}

test.afterEach(() => setLanguage("fr"));

test("French stays the default and the source text", () => {
  setLanguage(undefined);
  assert.equal(language(), "fr");
  assert.equal(locale(), "fr-FR");
  assert.equal(tr("Commande appliquée"), "Commande appliquée");
  setLanguage("fr-CA");
  assert.equal(language(), "fr");
  assert.equal(locale(), "fr-CA");
});

test("other Home Assistant languages use the English catalog with their own formatting locale", () => {
  setLanguage("en");
  assert.equal(language(), "en");
  assert.equal(tr("Commande appliquée"), "Applied command");
  setLanguage("it");
  assert.equal(language(), "en");
  assert.equal(locale(), "it");
  setLanguage("en-GB");
  assert.equal(numberFormat({maximumFractionDigits: 1}).format(1.25), "1.3");
  assert.equal(display(12.5, " %", 1), "12.5 %");
  setLanguage("fr");
  assert.equal(display(12.5, " %", 1), "12,5 %");
});

test("placeholders are positional and unknown keys fall back to the source", () => {
  setLanguage("en");
  assert.equal(tr("Publication · {0}", "12:00"), "Publication · 12:00");
  assert.equal(tr("Phase / état : {0} → {1}", "a", "b"), "Phase / state: a → b");
  assert.equal(tr("Texte sans traduction"), "Texte sans traduction");
  assert.equal(N_("Hors gel"), "Hors gel");
});

test("tables and per-language values follow the current language", () => {
  const table = translatedTable({frost: "Hors gel"});
  let builds = 0;
  const labels = perLanguage(() => { builds++; return [tr("Hors gel")]; });
  assert.equal(table.frost, "Hors gel");
  assert.equal(labels()[0], "Hors gel");
  assert.equal(labels(), labels());
  setLanguage("en");
  assert.equal(table.frost, "Frost protection");
  assert.equal(labels()[0], "Frost protection");
  assert.equal(Object.hasOwn(table, "frost"), true);
  assert.equal(builds, 2);
});

test("every translatable source string has an English entry with the same placeholders", () => {
  const keys = sourceKeys();
  assert.ok(keys.size > 800, `only ${keys.size} keys found`);
  const missing = [...keys].filter((key) => !Object.hasOwn(en, key));
  assert.deepEqual(missing, []);
  for (const [key, value] of Object.entries(en)) {
    assert.equal(placeholders(value), placeholders(key), `placeholders differ for ${key}`);
    assert.equal(value.match(/^\s*/)[0], key.match(/^\s*/)[0], `leading space differs for ${key}`);
    assert.equal(value.match(/\s*$/)[0], key.match(/\s*$/)[0], `trailing space differs for ${key}`);
  }
});

test("English catalog has no French left in translated values", () => {
  const french = /[àâçéèêëîïôûùüœ’]|\b(?:le|la|les|des|une|est|pas|avec|pour|dans|aucun|aucune)\b/i;
  const allowed = new Set(["Température & supervision"]);
  const leftovers = Object.entries(en).filter(([key, value]) => !allowed.has(key) && french.test(value) && !/^[A-Z]{2,}|τ|Δu/.test(value));
  assert.deepEqual(leftovers, []);
});
