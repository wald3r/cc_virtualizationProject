#!/bin/bash


#preparation
sudo chmod +xr *.sh
./install-docker-compose.sh
sudo docker-compose --compatibility down
sudo docker container rm bb redis server1 server2 server3 server4 server5 --force

#Task a
cd node-bulletin-board/bulletin-board-app
sudo docker image build -t bulletinboard:1.0 .
sudo docker container run --publish 8000:8080 --detach --name bb bulletinboard:1.0
cd ..
cd ..

sudo docker network create mynetwork

#Task b
./copy-db.sh
cd redis
sudo docker build -t redis .
sudo docker container run -d --network mynetwork --name redis redis 

#Task c
cd ..
sudo docker build -t server .
sudo docker container run -d  -p 3001:2999 --cpus=".05" --network mynetwork --name server1 server
sudo docker container run -d  -p 3002:2999 --cpus=".05" --network mynetwork --name server2 server
sudo docker container run -d  -p 3003:2999 --cpus=".05" --network mynetwork --name server3 server
sudo docker container run -d  -p 3004:2999 --cpus=".05" --network mynetwork --name server4 server
sudo docker container run -d  -p 3005:2999 --cpus=".05" --network mynetwork --name server5 server

#Task d
./install-npm.sh
cd balancer
npm start 

