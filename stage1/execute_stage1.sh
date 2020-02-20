#!/bin/bash


#Task a
cd node-bulletin-board/bulletin-board-app
sudo docker image build -t bulletinboard:1.0 .
sudo docker container run --publish 8000:8080 --detach --name bb bulletinboard:1.0
cd ..
cd ..

#Task b and c
sudo chmod +xr *.sh
./copy-db.sh
./install-docker-compose.sh
sudo docker-compose --compatibility down
sudo docker-compose --compatibility build
sudo docker-compose --compatibility up



#Task d
./install-npm.sh
cd balancer
npm start 

