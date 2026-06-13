# Sync .env.local vars to Vercel (production, preview, development).
# Usage: pwsh scripts/sync-vercel-env.ps1
param(
  [string]$EnvFile = ".env.local",
  [string]$Scope = "jaime-soto-s-projects"
)

$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

$overrides = @{
  "NEXT_PUBLIC_SITE_URL" = "https://familiainternacional-jaime-soto-s-projects.vercel.app"
  "APP_ORIGIN" = "https://familiainternacional-jaime-soto-s-projects.vercel.app"
  "AUTH_URL" = "https://familiainternacional-jaime-soto-s-projects.vercel.app"
}

$sensitive = @(
  "DATABASE_URL", "DIRECT_URL", "SUPABASE_SERVICE_ROLE_KEY", "AUTH_SECRET",
  "ADMIN_PASSWORD", "SMTP_PASSWORD", "RECAPTCHA_SECRET_KEY", "META_CAPI_ACCESS_TOKEN"
)

$lines = Get-Content $EnvFile | Where-Object { $_ -and $_ -notmatch '^\s*#' }
foreach ($line in $lines) {
  if ($line -notmatch '^\s*([^=]+)=(.*)$') { continue }
  $name = $matches[1].Trim()
  $value = $matches[2].Trim().Trim('"')
  if ($overrides.ContainsKey($name)) { $value = $overrides[$name] }
  if ([string]::IsNullOrWhiteSpace($value)) { continue }

  $flag = if ($sensitive -contains $name) { "--sensitive" } else { "" }
  foreach ($env in @("production", "preview", "development")) {
    $args = @("env", "add", $name, $env, "--value", $value, "--yes", "--force", "--scope", $Scope)
    if ($flag) { $args += $flag }
    & vercel @args 2>&1 | Out-Null
  }
  Write-Host "Synced $name"
}

Write-Host "Done."
