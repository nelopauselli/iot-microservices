#!/bin/bash  
sudo docker stop statistics
sudo docker container rm statistics
sudo docker image rm statistics
sudo docker build -t statistics .
sudo docker run -d -it --link mongo:mongodb --name statistics statistics

