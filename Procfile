web: webpack-dev-server --open
api: pm2 kill && pm2 start --node-args="--inspect=7000" ./server/index.js --no-daemon --watch
