#!/usr/bin/env bash
# Builds the public folder `dist/` from an explicit allowlist.
# Nothing outside the allowlist is copied, so README, deploy/, .wrangler/,
# screenshots and scripts never reach the published site.
# Source files are never modified or deleted; only the generated dist/ is rebuilt.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"

# ---- Allowlist: the only paths that are published ----
PUBLIC_FILES=(
  "index.html"
  "assets/styles.css"
  "assets/script.js"
  "assets/logo-mark.png"
)

# ---- Build ----
rm -rf "$DIST"
mkdir -p "$DIST"
for f in "${PUBLIC_FILES[@]}"; do
  if [[ ! -f "$ROOT/$f" ]]; then
    echo "ERROR: allowlisted file missing: $f" >&2
    exit 1
  fi
  mkdir -p "$DIST/$(dirname "$f")"
  cp "$ROOT/$f" "$DIST/$f"
done

# ---- Verify: nothing outside the allowlist, and every local reference resolves ----
actual=$(cd "$DIST" && find . -type f | sed 's|^\./||' | sort)
expected=$(printf '%s\n' "${PUBLIC_FILES[@]}" | sort)
if [[ "$actual" != "$expected" ]]; then
  echo "ERROR: dist/ contents differ from allowlist" >&2
  diff <(echo "$expected") <(echo "$actual") >&2 || true
  exit 1
fi

missing=0
while IFS= read -r ref; do
  [[ -z "$ref" ]] && continue
  if [[ ! -e "$DIST/$ref" ]]; then
    echo "ERROR: broken local reference: $ref" >&2
    missing=1
  fi
done < <(grep -oE '(href|src)="[^"#?:]+"' "$DIST/index.html" | sed -E 's/^(href|src)="//; s/"$//' | grep -v '^//' || true)

url_refs=$(grep -oE 'url\("?[^")]+' "$DIST/assets/styles.css" | sed -E 's/^url\("?//' | grep -vE '^(data:|https?:)' || true)
while IFS= read -r ref; do
  [[ -z "$ref" ]] && continue
  if [[ ! -e "$DIST/assets/$ref" ]]; then
    echo "ERROR: broken CSS url(): $ref" >&2
    missing=1
  fi
done <<< "$url_refs"

if [[ $missing -ne 0 ]]; then exit 1; fi

echo "dist/ built: $(echo "$actual" | wc -l) files"
echo "$actual" | sed 's/^/  /'
