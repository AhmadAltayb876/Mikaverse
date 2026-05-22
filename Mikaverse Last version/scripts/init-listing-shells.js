#!/usr/bin/env node
/** Creates listing HTML shells from data/<section>/content.json page metadata */
const fs = require("fs");
const path = require("path");
const { buildListingShell } = require("./lib/listing-shell");

const ROOT = path.join(__dirname, "..");
const sections = [
  "amateurs-projects",
  "blogs",
  "modules",
  "system-analysis",
];

sections.forEach((key) => {
  const dataPath = path.join(ROOT, "data", key, "content.json");
  const listingPath = path.join(ROOT, "html", `${key}.html`);
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  fs.writeFileSync(listingPath, buildListingShell(data.page), "utf8");
  console.log("Wrote", path.relative(ROOT, listingPath));
});
