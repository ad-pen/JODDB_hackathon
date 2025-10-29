#!/usr/bin/env bash
set -euo pipefail
ROOT="$(pwd)"
TS=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR="$ROOT/backups"
BACKUP_FILE="$BACKUP_DIR/cleanup-backup-$TS.tar.gz"

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_FILE" src static templates assets package.json package-lock.json yarn.lock || true
echo "Backup created at $BACKUP_FILE"

npm install --no-audit --no-fund --save-dev @babel/parser @babel/generator glob minimist eslint || true

node scripts/remove_comments.js --root "$ROOT"

npx eslint "src/**/*.{js,jsx}" --fix || true

echo "Cleanup complete. Verify by running:"
echo "  npm start"
echo "  npm test"
echo "To restore, extract: $BACKUP_FILE"
