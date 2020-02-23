#!/bin/bash


#preparation
sudo docker container rm bb redis server1 server2 server3 server4 server5 --force
sudo chmod +xr copy-db.sh
./copy-db.sh


#Task b
docker build -t server_image ./server
docker build -t server_image ./redis

docker swarm leave --force
docker swarm init
docker stack deploy --compose-file docker-compose.yml project


