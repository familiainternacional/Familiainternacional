#!/usr/bin/env bash
# Purga "Familia Internacional Credenciales.txt" del historial de git.
# Ejecutar SOLO después de rotar todas las credenciales expuestas.
#
# Requisitos: git filter-repo (pip install git-filter-repo)
#
# Uso:
#   bash scripts/purge-credentials-from-history.sh
#
set -euo pipefail

FILE="Familia Internacional Credenciales.txt"

if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "Instala git-filter-repo: pip install git-filter-repo"
  exit 1
fi

echo "Eliminando '${FILE}' de todo el historial..."
git filter-repo --path "${FILE}" --invert-paths --force

echo "Listo. Revisa el repo y luego:"
echo "  git push origin main --force-with-lease"
echo "Avisa al equipo: todos deben re-clonar o resetear sus ramas locales."
