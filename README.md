# Docker Practical Course - [Tresmerge](https://www.youtube.com/watch?v=tHP5IWfqPKk&list=PLzNfs-3kBUJnY7Cy1XovLaAkgfjim05RR&index=1)

- First of all, you have to install [Docker desktop](https://docs.docker.com/) on your machine.

## Basic Dockerfile 
```
FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]

```

#### 1. ```FROM node:14```
Inside the container, install node js.

#### 2. ```WORKDIR /app```
Create Folder "app".

#### 3. ```COPY package.json .```
copy package.json inside "app" Folder.

#### 4. ```RUN npm install ```
RUN nmp install to install all the packages inside package.json -> node_modules.

#### 5. ```COPY . . ```
Copy all files inside the container.

#### 6. ```EXPOSE 4000 ```
The app will run on port 4000, just for documentation.

#### 7. ```CMD [ "npm", "start" ] ```
Run the App using npm.

#### 8. ```CMD [ "npm", "run", "start-dev" ] ```
Run the App using nodemon.

- Check out the figure for more explanation.

<img alt="Dockerfile" src="assets/Dockerfile.png" />

## Basic Command Lines

#### 1. ``` docker build -t "name of the Dockerfile" .```
- example → docker build -t express-node-app .
- After build the Dockerfile (you have an "image" now).
- Dockerfile → bulid → image.

