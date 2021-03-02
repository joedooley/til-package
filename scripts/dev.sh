#!/usr/bin/env bash
yarn clean
echo "┏━━━ 🕵️‍♀️ Starting DEV Server: next dev -p ${PORT:=4000} ━━━━━━━"

next dev -p ${PORT:=4000}
