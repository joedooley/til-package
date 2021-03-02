#!/usr/bin/env bash
yarn clean
echo "┏━━━ 📦 Building $(pwd) ━━━━━━━━━━━━━━━━━━━"
next build
