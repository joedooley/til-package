#!/usr/bin/env bash
echo "┏━━━ 🕵️‍♀️ TEST: jest --watch ━━━━━━━"
yarn jest --watch && yarn cypress open
