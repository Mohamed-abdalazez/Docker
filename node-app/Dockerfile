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
