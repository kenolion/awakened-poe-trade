# Starts the renderer (Vite) and main (Electron) dev servers.
# Usage: .\dev.ps1            (from the repo root, or double-click dev.cmd)
#        .\dev.ps1 -Install   (run `npm ci` in both folders first)
param(
  [switch]$Install
)

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$renderer = Join-Path $root 'renderer'
$main = Join-Path $root 'main'
$shell = if (Get-Command pwsh -ErrorAction SilentlyContinue) { 'pwsh' } else { 'powershell' }

if ($Install) {
  foreach ($dir in @($renderer, $main)) {
    Write-Host "Installing dependencies in $dir" -ForegroundColor Cyan
    Push-Location $dir
    try { npm ci; if ($LASTEXITCODE -ne 0) { throw "npm ci failed in $dir" } }
    finally { Pop-Location }
  }
}

function Test-Port ([int]$Port) {
  $client = [System.Net.Sockets.TcpClient]::new()
  try { $client.Connect('localhost', $Port); return $true }
  catch { return $false }
  finally { $client.Dispose() }
}

$rendererPort = 5173
if (Test-Port $rendererPort) {
  Write-Host "Renderer already running on port $rendererPort, reusing it." -ForegroundColor Yellow
} else {
  Write-Host 'Starting renderer in a new window...' -ForegroundColor Cyan
  Start-Process $shell -WorkingDirectory $renderer -ArgumentList '-NoExit', '-Command', '$Host.UI.RawUI.WindowTitle = ''APT renderer''; npm run dev'

  Write-Host "Waiting for renderer on port $rendererPort" -NoNewline
  $deadline = (Get-Date).AddSeconds(90)
  while (-not (Test-Port $rendererPort)) {
    if ((Get-Date) -gt $deadline) {
      Write-Host ''
      throw "Renderer did not start on port $rendererPort within 90s. Check the renderer window for errors."
    }
    Write-Host '.' -NoNewline
    Start-Sleep -Milliseconds 500
  }
  Write-Host ' ready.' -ForegroundColor Green
}

Write-Host 'Starting main (Electron). Press Ctrl+C to stop it; close the renderer window separately.' -ForegroundColor Cyan
Push-Location $main
try { npm run dev }
finally { Pop-Location }
