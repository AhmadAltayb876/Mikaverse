@echo off
cd /d "%~dp0"
echo Generating all project sections from content.json...
node scripts\init-listing-shells.js
if errorlevel 1 goto fail
node scripts\generate-project-section.js all
if errorlevel 1 goto fail
echo.
echo Finished. Open html\ folders for each section.
pause
exit /b 0

:fail
echo.
echo Failed. Install Node.js from https://nodejs.org then run again.
pause
exit /b 1
