#!/usr/bin/env node
/**
 * Mikaverse — Company project HTML generator
 *
 * Edit:  data/companies-projects/content.json
 * Run:   node scripts/generate-company-projects.js
 */

const { generateSection } = require("./lib/generate-project-section");
generateSection("companies-projects");
