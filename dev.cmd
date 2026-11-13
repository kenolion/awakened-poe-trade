@echo off
rem Double-click launcher for dev.ps1 (bypasses the PowerShell execution policy for this script only).
where pwsh >nul 2>nul
if %errorlevel%==0 (
  pwsh -NoProfile -ExecutionPolicy Bypass -File "%~dp0dev.ps1" %*
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0dev.ps1" %*
)
