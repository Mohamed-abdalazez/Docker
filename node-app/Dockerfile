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







# To sync between the local env and the container
# sudo docker run --name express-node-app-container -v local dir:contaoner dir -d -p 4000:4000 express-node-app
# sudo docker run --name express-node-app-container -v /home/mohamed/Desktop/Safrot/Projects/Docker/node-app:/app -d -p 4000:4000 express-node-app

