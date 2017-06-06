#!/bin/bash  
sudo docker stop hub
sudo docker container rm hub
sudo docker image rm hub
sudo docker build -t hub .
sudo docker run -p 8081:3000 -d -it --link mongo:mongodb --name hub hub

