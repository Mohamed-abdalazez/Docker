FROM node:14
# Inside the container, install node js

WORKDIR /app

# Create Folder "app"

COPY package.json .

# copy package.json inside "app" Folder

RUN npm install 

# RUN nmp install to install all the packages inside package.json -> node_modules

COPY . .

# Copy all files inside the container

EXPOSE 4000

# The app will run on port 4000, just for documentation.


#CMD [ "npm", "start" ]
#Run the App using npm

CMD [ "npm", "run", "start-dev" ]
#Run the App using npm

#Dockerfile: build -> image: Run -> containers 

# Command lines

# build: sudo docker build -t express-node-app . (-t "name")

# after build the Dockerfile (you have an "image" now)

# list all images
# sudo docker image ls

# list all the running containers 
# sudo docker ps

# remove container 
# sudo docker rm "the name of container"
# sudo docker rm express-node-app-container -f

# Run the container 
# sudo run --name "name of the container" "name of image" 
# sudo docker run --name express-node-app-container express-node-app -> 1st way
# sudo docker run --name express-node-app-container -d express-node-app -> 'd' for detach the logs


# Forward the port
# sudo docker run --name express-node-app-container -d -p "port my local machine:contaoner port" express-node-app
# sudo docker run --name express-node-app-container -d -p 4000:4000 express-node-app


# Open an interactive terminal in the container.
# docker exec -it "name of the container" bash
# sudo docker exec -it express-node-app-container bash
#
# root@dee98138027a:/app# ls
# Dockerfile  index.js  node_modules  package-lock.json  package.json
# root@dee98138027a:/app#

# Docker Optimization 
# 1. create .dockerignore to avoid useless files


# To make the server detect all the changes will use CMD [ "npm", "run", "start-dev" ]



# To see the logs of the container 
# sudo docker logs  express-node-app-container

# To sync between the local env and the container
# sudo docker run --name express-node-app-container -v local dir:contaoner dir -d -p 4000:4000 express-node-app
# sudo docker run --name express-node-app-container -v /home/mohamed/Desktop/Safrot/Projects/Docker/node-app:/app -d -p 4000:4000 express-node-app

