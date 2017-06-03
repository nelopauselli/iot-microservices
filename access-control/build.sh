#!/bin/bash  
sudo docker stop access-control
sudo docker container rm access-control
sudo docker image rm access-control
sudo docker build -t access-control .
sudo docker run -p 8082:8080 -d -it --link redis:redis --name access-control access-control

