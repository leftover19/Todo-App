#!/usr/bin/bash

cd Todo-App
git pull origin main
pm2 kill
pm2 start index.js

