#!/bin/bash  
sudo docker stop hub
sudo docker container rm hub
sudo docker image rm hub
sudo docker build -t hub .


