#!/usr/bin/env bash
echo "┏━━━ 🕵️‍♀️ Building/Starting PROD Server: yarn build && yarn start -p ${PORT:=3000} ━━━━━━━"
yarn build && yarn start -p ${PORT:=3000}
