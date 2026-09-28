@echo off
title AEGIS // High-Tech Authentication & Quantum Task Matrix
echo =========================================================================
echo   AEGIS // ASSIGNMENT 7: AUTHENTICATION SYSTEM WITH TASK ROUTING
echo   Lead Operative: Sohan Ghosh
echo =========================================================================
echo.
echo [1/2] Opening project workspace in Visual Studio Code...
start "" code "%~dp0"
echo [2/2] Launching Vite development server...
echo.
cd /d "%~dp0"
npm run dev
pause
