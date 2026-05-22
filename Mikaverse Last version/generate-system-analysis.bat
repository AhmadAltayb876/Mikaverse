@echo off
cd /d "%~dp0"
node scripts\generate-project-section.js system-analysis
pause
