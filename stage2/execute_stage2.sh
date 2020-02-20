#!/bin/bash


#preparation
sudo docker container rm bb redis server1 server2 server3 server4 server5 --force
sudo chmod +xr copy-db.sh
./copy-db.sh

#Task a
sudo chmod +xr install-docker-compose.sh
./install-docker-compose.sh
#see docker-compose.yml



#Task b
sudo chmod +xr install-npm.sh
./install-npm.sh
sudo chmod +xr run.sh
./run.sh 3
