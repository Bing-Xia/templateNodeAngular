# node-app/app.js, node-app/app.sh should run at the node-app directory
# Enable load-balancer and cluster features
../node_modules/pm2/bin/pm2 -f start ./app.js --name "drar" -i 0