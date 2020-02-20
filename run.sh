sudo docker-compose --compatibility down
git pull https://github.com/wald3r/cc_virtualizationProject.git
sudo docker-compose --compatibility build
sudo docker-compose --compatibility up  -d --scale server=3 --scale redis=1

cd balancer && npm install && npm update && npm start
