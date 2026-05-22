@echo off
cd /d "%~dp0"
echo Generating company project HTML from content.json...
node scripts\generate-company-projects.js
if errorlevel 1 (
  echo.
  echo Failed. Install Node.js from https://nodejs.org then run again.
  pause
  exit /b 1
)
echo.
echo Finished. Open html\companies-projects\ to see pages.
pause
