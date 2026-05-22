#!/usr/bin/env node
/**
 * Mikaverse — Project section HTML generator
 *
 * Usage:
 *   node scripts/generate-project-section.js <section-key>
 *   node scripts/generate-project-section.js all
 *
 * Sections: companies-projects, amateurs-projects, blogs, modules, system-analysis
 *
 * Edit data/<section>/content.json then run the command for that section.
 */

const { generateSection } = require("./lib/generate-project-section");

const ALL_SECTIONS = [
  "companies-projects",
  "amateurs-projects",
  "blogs",
  "modules",
  "system-analysis",
];

const arg = process.argv[2];

if (!arg) {
  console.error("Usage: node scripts/generate-project-section.js <section-key|all>");
  process.exit(1);
}

const sections = arg === "all" ? ALL_SECTIONS : [arg];

if (arg !== "all" && !ALL_SECTIONS.includes(arg)) {
  console.error("Unknown section:", arg);
  console.error("Valid:", ALL_SECTIONS.join(", "));
  process.exit(1);
}

let failed = false;
sections.forEach((key) => {
  console.log("\n---", key, "---");
  try {
    generateSection(key);
  } catch (err) {
    failed = true;
    console.error(err.message || err);
  }
});

if (failed) process.exit(1);
