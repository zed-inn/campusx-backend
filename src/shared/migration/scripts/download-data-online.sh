#!/usr/bin/env bash
set -euo pipefail

list=(
  "category"
  "chat"
  "follow"
  "forumcomment"
  "forumlike"
  "forum"
  "insight"
  "institutediscreaction"
  "institutedisc"
  "institutereview"
  "institute"
  "message"
  "notification"
  "education"
  "wallet"
  "profile"
  "refcode"
  "user"
)

for listItem in "${list[@]}"; do
  url="https://api.thoughtshub.agency/loaded/data${listItem}.json"
  out="./src/shared/migration/data.old/${listItem}-data.json"
  echo "Downloading ${url} -> ${out}"
  curl -fSL --retry 3 --retry-delay 2 -o "${out}" "${url}"
done
