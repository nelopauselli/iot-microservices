#!/bin/bash  
sudo docker stop balancer
sudo docker container rm balancer
sudo docker image rm balancer
sudo docker build -t balancer .
sudo docker run -p 8081:8081 -d --link hub1:hub1 --link hub2:hub2 --link hub3:hub3 --name balancer balancer
