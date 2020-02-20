#!/bin/bash


#Task a

sudo docker image build -t bulletinboard:1.0 .
sudo docker container run --publish 8000:8080 --detach --name bb bulletinboard:1.0

#Task b
sudo chmod +xr copy-db.sh
./copy-db.sh
cd redis
sudo docker image build -t redis .
sudo docker container run -d --name redis redis
cd ..

#Task c
cd server
sudo docker image build -t server .
sudo docker container run -d --name server server
cd ..

#Task d
sudo chmod +xr install-npm.sh
./install-npm.sh
cd balancer
npm start 

