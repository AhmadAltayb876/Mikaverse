@echo off
cd /d "%~dp0"
node scripts\generate-project-section.js modules
pause
