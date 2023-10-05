#!/usr/bin/bash
export PATH = $PATH:/home/ubuntu/.nvm/versions/node/v20.8.0/bin
cd Todo-App
git pull origin main
pm2 kill
cd server
pm2 start index.js

