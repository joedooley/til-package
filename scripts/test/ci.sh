#!/usr/bin/env bash
echo "┏━━━ 🕵️‍♀️ TEST: jest --ci --coverage ━━━━━━━"
yarn jest --ci --coverage

echo "┏━━━ 🕵️‍♀️ TEST E2E: cypress run ━━━━━━━"
yarn cypress run
