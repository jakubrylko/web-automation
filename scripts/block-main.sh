#!/bin/sh

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT_BRANCH" = "main" ]; then
  echo "\033[31mYou cannot commit directly to the 'main' branch.\033[0m"
  exit 1
fi
