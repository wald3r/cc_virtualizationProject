#!/bin/bash

SCALE=$1

sudo docker-compose --compatibility down
#git pull https://github.com/wald3r/cc_virtualizationProject.git
sudo docker-compose --compatibility build
sudo docker-compose --compatibility up  -d --scale server=$SCALE --scale redis=1

cd balancer && npm start
