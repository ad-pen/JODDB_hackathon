#!/usr/bin/env bash
set -euo pipefail
ROOT="$(pwd)"
TS=$(date +"%Y%m%d-%H%M%S")
BACKUP_DIR="$ROOT/backups"
BACKUP_FILE="$BACKUP_DIR/cleanup-backup-$TS.tar.gz"

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_FILE" src static templates assets package.json package-lock.json yarn.lock || true
echo "Backup created at $BACKUP_FILE"

# install node deps needed for comment removal and eslint autofix
npm install --no-audit --no-fund --save-dev @babel/parser @babel/generator glob eslint depcheck || true

# run node script to remove comments (in-place with .bak copies)
node scripts/remove_comments.js --root "$ROOT"

# run eslint autofix to remove trivial unused code (non-destructive)
# ensure you have an .eslintrc or eslint installed. This will only auto-fix fixable rules.
npx eslint "src/**/*.{js,jsx}" --fix || true

echo "Cleanup complete. Run your dev server and tests to verify:"
echo "  npm start"
echo "  npm test"
echo "If you need to restore, extract $BACKUP_FILE"
