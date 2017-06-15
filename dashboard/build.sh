#!/bin/bash  
sudo docker stop dashboard
sudo docker container rm dashboard
sudo docker image rm dashboard
sudo docker build -t dashboard .
sudo docker run -p 8080:8080 -d --link statistics:statistics --name dashboard dashboard
