# Docker Practical Course - [Tresmerge](https://www.youtube.com/watch?v=tHP5IWfqPKk&list=PLzNfs-3kBUJnY7Cy1XovLaAkgfjim05RR&index=1)



<img alt="Covern" src="assets/Cover.png" /><br><br>



### Table of content

1. [Docker desktop.](#desc0)
2. [Basic Dockerfile.](#desc1)
3. [Basic Command Lines.](#desc2)
4. [The difference between images and containers.](#desc3)
5. [Docker Optimization.](#desc4)
6. [Volumes.](#desc5)
7. [Hot Reload.](#desc6)
8. [Docker Compose.](#desc7)
9. [Environment Variables.](#desc8)
10. [Docker Environments Management.](#desc9)
11. [Multi-Stage Dockerfile.](#desc10)
12. [Docker with different services.](#desc11)
    - MongoDB.
    - NodeJS.
    - Mongo-Express.
    - Redis.
    - Nginx.
    - PostgreSQL.


13. [Docker with Laravel.](#desc12)
14. [Setup Docker on AWS EC2 and deploy the node application to the server.](#desc13)
15. [Push Images to DockerHub.](#desc14)
16. [Load Balancing with Nginx.](#desc15)
17. [Automate Docker Deployment.](#desc16)
18. [How CI/CD Works.](#desc17)
19. [Docker Orchestration.](#desc18)
20. [Docker Swarm.](#desc19)
21. [Rolling Update.](#desc20)

<a name="desc0"></a>
## Docker desktop

- First of all, you have to install [Docker desktop](https://docs.docker.com/) on your machine.


<a name="desc1"></a>
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
Run the App using nodemon, To make the server detect all the changes.

- Check out the figure for more explanation.

<img alt="Dockerfile" src="assets/Dockerfile.png" />

<a name="desc2"></a>
## Basic Command Lines

#### 1. ``` docker build -t "name of the Dockerfile" ```
- example:- ```docker build -t express-node-app .```
- After build the Dockerfile (you have an "image" now).
- Dockerfile → bulid → image → Run → Container.

#### 2. ``` docker run --name "name of the container" "name of image" ```
- example:- ```docker run --name express-node-app-container express-node-app```, 1st way.
- example:- ```docker run --name express-node-app-container -d express-node-app```, 2nd way, What is new here is the flag ```-d``` for detach the logs.

#### 3. ``` docker run --name "name of the container" "name of image" ```
- example:- ```docker run --name express-node-app-container express-node-app```, 1st way.
- example:- ```docker run --name express-node-app-container -d express-node-app```, 2nd way, What is new here is the flag ```-d``` for detach the logs.
- Now, if you run the app on your localhost, it doesn't work. You have to ***forward the port*** first. How?! , See the following command line.


#### 4. ```docker run --name "name of the container" -d -p my local machine port:container port "name of image"  ```
- example:- ```docker run --name express-node-app-container -d -p 4000:4000 express-node-app```

#### 5. ```docker image ls```
- list all images.

#### 6. ```docker image ls```
- list all the running containers.

#### 7. ```docker rm "the name of container" -f```
- example:- ```docker rm express-node-app-container -f```.

#### 8. ```docker exec -it "name of the container" bash```
- example:- ```docker exec -it express-node-app-container bash```.
- Open an interactive terminal in the container.
- Your terminal now:
``` 
root@dee98138027a:/app# ls
Dockerfile  index.js  node_modules  package-lock.json  package.json
root@dee98138027a:/app#
```
#### 9. ```docker logs "the name of container"```
- example:- ```docker logs  express-node-app-container```.
- To see the logs of the container.

#### 10. ```docker --help```
- For all command-line details.

<a name="desc3"></a>
## The difference between images and containers

- Check out the figure.

<img alt="ImagesVScontainers" src="assets/ImagesVScontainers.png" />

<a name="desc4"></a>
## Docker Optimization
- Create ```.dockerignore``` to avoid useless files.
- Why was the package.json file copied first and then all the other files copied again?
- Good question; check the figure for the answer.

<img alt="package" src="assets/package.png" />

<a name="desc5"></a>
## Volumes
- When do we need Docker Volumes?
- What exactly is Docker Volumes?
- Docker Volumes Types.
- Check out the figure.

<img alt="Docker Volumes" src="assets/Docker Volumes.png" />

<a name="desc6"></a>
## Hot Reload
- syncing between the local environment and the container.
- When you run the container, use that ```run --name "name of the container"``` ```-v``` ***absolute path for your local directory***:***Whatever directory is inside the container you want to sync with*** ```-d -p my local machine port:container port "name of image"```.
- example:- ```docker run --name express-node-app-container -v /home/mohamed/Desktop/Safrot/Projects/Docker/node-app:/app -d -p 4000:4000 express-node-app```.
- Also, you can use this instead of the full path:
    - Linux and mac: ```$(pwd)```, The command line will be as follows: ```docker run --name express-node-app-container -v $(pwd):/app -d -p 4000:4000 express-node-app```.
    - Windows: ```%cd%```, The command line will be as follows: ```docker run --name express-node-app-container -v %cd%:/app -d -p 4000:4000 express-node-app```.
- But what are the problems here?
    - If you add or delete files inside the container or on the local machine, this will change both sides at the same time.
    - One suggested solution is to sync or bind the application source code on your localhost with the application source code in the container,      considering that you make the directory in the container read-only.
    - example: 
        - ```docker run --name express-node-app-container -v $(pwd)/src:/app/src:ro -d -p 4000:4000 express-node-app```
 

<a name="desc7"></a>
## Docker Compose
- What is Docker Compose?
    - Docker Compose is a tool for defining and running multi-container Docker applications.by using a ```YAML file``` to configure your application services. 
    Then, with a single command, you create and start all the services in your configuration.
    
- ```docker-compose.yml:```
 ``` yaml
 version: "3"
services:
  node-app: 
    container_name: express-node-app-container
    build: .
    volumes:
      - ./src:/app/src:ro
    ports: 
      - "4000:4000"
```  
- Check out the figure.
<img alt="docker-compose" src="assets/Docker Compose.png" />


<a name="desc8"></a>
## Environment Variables.

- How to pass environment variables to the container?
    1. Via the Dockerfile itself, as follows:
        - You'll notice here that we used ```ENV PORT=4000``` inside the Docker file itself.
    ```
    FROM node:14

    WORKDIR /app

    COPY package.json .

    RUN npm install 

    COPY . .
    
    ENV PORT=4000

    EXPOSE $PORT

    CMD [ "npm", "run", "start-dev" ]

    ```
    2. Via the command line, as follows:
    ```
    --env list                       Set environment variables
    --env-file list                  Read in a file of environment variables
    ```
     - eg:
    ```
    - Set environment variables:
    docker run --name express-node-app-container -v $(pwd)/src:/app/src:ro --env PORT=400 --env NODE_ENV=development -d -p 4000:4000 express-node-app
    - Read in a file of environment variables:
    docker run --name express-node-app-container -v $(pwd)/src:/app/src:ro --env-file ./.env -d -p 4000:4000 express-node-app
    ```
    - So, if you open an interactive terminal in the container and use printenv, you will find your env variables.
    ```
    $ docker exec -it express-node-app-container bash
    root@78ca00db2d62:/app# printenv
    PORT=400
    NODE_ENV=development
    ```
    3. Via the docker-compose, as follows:
      
     - Set environment variables.
    ```yaml
    version: "3"
    services:
        node-app: 
         container_name: express-node-app-container
         build: .
         volumes:
          - ./src:/app/src:ro
         ports: 
          - "4000:4000"
         environment:
          - Port=4000
          - NODE_ENV=production
    ```
    - Read in a file of environment variables.
    
    
   ```yaml
    version: "3"
    services:
        node-app: 
         container_name: express-node-app-container
         build: .
         volumes:
          - ./src:/app/src:ro
         ports: 
          - "4000:4000"
         env_file:
          - ./.env
    ```

<a name="desc9"></a>
## Docker Environments Management

- Docker environment management across multiple environments.
- Check out the figure.
<img alt="Docker environment management" src="assets/Docker environment management.png" />

- the command lines in the figure, to be copied if you want
   - ```Run: docker-compose -f docker-compose.dev.yml up -d```
   - ```Run: docker-compose -f docker-compose.prod.yml up -d```
   - ```Development Run: docker-compose -f docker-compose.yml  -f docker-compose.dev.yml  up -d```
   - ```Production Run: docker-compose -f docker-compose.yml  -f docker-compose.prod.yml  up -d```
   - ```docker exec -it express-node-app-container bash```

<a name="desc10"></a>
## Multi-Stage Dockerfile

- The first solution is that you can create a Dockerfile for each environment.
- The second solution is that you can create a single Docker file and manage all environments through it.
- Let's delve deeper into the second solution.
     -  We have to run ```CMD [ "npm", "start" ]``` in production and ```CMD [ "npm", "run", "start-dev" ]``` in development.
    <br>
    
    
    - development:
    
    ```yaml
     version: "3"
     services:
      node-app:
       volumes:
         - ./src:/app/src:ro
       environment:
         - NODE_ENV=development
       command: npm run start-dev
     ``` 
      
    - production:
   
    ```yaml
     version: "3"
     services:
      node-app:
       environment:
         - NODE_ENV=production
       command: npm run start
     ``` 
     - Nodemon is installed in node modules, although we are running the container from the production compose file and not from the development compose file. There are two solutions to this problem.
     
       1. Make a simple check to verify the environment.<br>
 
          <img alt="simple check.png" src="assets/simple check.png" />  <br>
          
            - the command lines in the figure, to be copied if you want.<br>
                 -  simple check <br>
                ```
                RUN if ["$NODE_ENV" = 'production'];\
                then nmp install --only=production;\
                else npm install;\
                fi
                ```
                - ```docker-compose -f docker-compose.yml  -f docker-compose.dev.yml  up -d --build```

                - ```docker-compose -f docker-compose.yml  -f docker-compose.prod.yml  up -d --build```
          
       
       2. The Multi-Stage environment.<br>
         - The Multi-Stage environment is when you separate the Dockerfile for more than one stage.
         - Check out the figure.
         
              <img alt="Multi-Stage environment" src="assets/Multi-Stage environment.png" />  <br>
          
          - the command lines in the figure, to be copied if you want.<br>
            -  Docker File with multistage<br>
              
                ```
                FROM node:14 as base

                FROM base as development

                WORKDIR /app
                COPY package.json .
                RUN npm install 
                COPY . .
                EXPOSE 4000
                CMD [ "npm", "run", "start-dev" ]

                FROM base as production

                WORKDIR /app
                COPY package.json .
                RUN npm install --only=production 
                COPY . .
                EXPOSE 4000
                CMD [ "npm", "start"]
                ```
                
                - ```docker-compose -f docker-compose.yml  -f docker-compose.dev.yml  up -d --build```

                - ```docker-compose -f docker-compose.yml  -f docker-compose.prod.yml  up -d --build```

<a name="desc11"></a>
## Docker with different services


- You can find the code in the ```Services``` folder.
- [MongoDB](https://www.mongodb.com/) & [NodeJS](https://nodejs.org/en/) & [Mongo-Express](https://github.com/mongo-express/mongo-express).
- Check out the figure.

    <img alt="MongoDB & NodeJS & Mongo-Express_1" src="assets/MongoDB & NodeJS & Mongo-Express_1.png" /><br><br>
    <img alt="MongoDB & NodeJS & Mongo-Express_2" src="assets/MongoDB & NodeJS & Mongo-Express_2.png" /><br><br>
    <img alt="MongoDB & NodeJS & Mongo-Express_3" src="assets/MongoDB & NodeJS & Mongo-Express_3.png" /><br><br>
    <img alt="MongoDB & NodeJS & Mongo-Express_4" src="assets/MongoDB & NodeJS & Mongo-Express_4.png" /><br><br>
    
- Some command lines you have to know here are:
   - ```docker inspect "name of the container"```, Return low-level information on Docker objects.
   - ```docker volume ls```, List volumes.
   - ```docker volume prune```, Remove all unused local volumes.
   - And always remember that if you use ```--help``` after any utility, you will get more information about all command lines.
   
     - eg. ```docker volume --help```
     <br>
     
     ```
     Usage:  docker volume COMMAND

     Manage volumes

     Commands:
     create      Create a volume
     inspect     Display detailed information on one or more volumes
     ls          List volumes
     prune       Remove all unused local volumes
     rm          Remove one or more volumes
     
     Run 'docker volume COMMAND --help' for more information on a command.
     
     ```
- [Redis](https://redis.io/).
    - As we have learned, go to the Docker Hub and search for Redis; you will find the official version. You can find how to add the service in the documentation.
    - Now add the new container to ```docker-compose.yml```.As we did in the last part. 
    
    <br>
    <img alt="addRedisContainer" src="assets/addRedisContainer.png" />
    <br>
    
    - Now let's run the app, ```docker-compose -f docker-compose.yml  -f docker-compose.dev.yml  up -d```, You can see:
       
       ```
       Status: Downloaded newer image for redis:latest
       Creating services_mongo-express_1   ... done
       Creating express-node-app-container ... done
       Creating services_mongo_1           ... done
       Creating services_redis_1           ... done 
       ```
     - Important thing to remember, When you start running containers, it will start randomly, so if one container depends on another, you have to specify this.As follows:

    <br>
    <img alt="depends_on.png" src="assets/depends_on.png" />
    <br>
    <br>
    
- [Nginx](https://www.nginx.com/)
    - As we have learned, go to the Docker Hub and search for Nginx; you will find the official version. You can find how to add the service in the documentation.
    - Now add the new container to ```docker-compose.yml```.As we are used to.
    
    <br>
    <img alt="addNginxContainer" src="assets/addNginxContainer.png" />
    <br>
    
    - Now let's run the app, ```docker-compose -f docker-compose.yml  -f docker-compose.dev.yml  up -d```, You can see:
       
       ```
        Status: Downloaded newer image for nginx:stable-alpine
        Creating services_redis_1 ... done
        Creating services_mongo_1 ... done
        Creating services_nginx_1 ... done
        Creating express-node-app-container ... done
        Creating services_mongo-express_1   ... done
       ```
       
    - Now let's make the nginx server receive the requests and forward them to my node-app.   
     
       
      <br>
      <img alt="nginx.png" src="assets/nginx.png" />
      <br>


- [PostgreSQL](https://www.postgresql.org/)

    - As we did in Mongo previously, go to the Docker Hub and search for PostgreSQL; you will find the official version. You can find how to add the service in the documentation.
    - I'll just include docker-compose and how to connect to Postgresql here. and the explanation as above.
    
    - Add the Container:<br>

    ```yaml
    version: "3"
    services:
      node-app: 
        container_name: express-node-app-container
        ports: 
          - "4000:4000"
        env_file:
          - ./.env
        depends_on:
          - postgres
      postgres:
        image: postgres
        restart: always
        volumes:
         - postgres-db:/var/lib/postgresql/data #Named volume
        environment:
          POSTGRES_USER: root  
          POSTGRES_PASSWORD: example
    volumes:
      mongo-db: 
      postgres-db:
    ```
   - Connect to PostgreSQL:

     ```javascript
         const express = require("express");
         const { Client } = require("pg");
    
        // init app
        const PORT = process.env.PORT || 4000;
        const app = express();

        // connect PostgresSQL
        const POSTGRES_USER = "root";
        const POSTGRES_PASSWORD = "example";
        const DB_PORT = 5432;
        const DB_HOST = "postgres";
    
        const URI = `postgresql://${POSTGRES_PASSWORD}:${POSTGRES_USER}@${DB_HOST}:${DB_PORT}`;
    
        const client = new Client({
        connectionString: URI,
        });

        client
        .connect()
        .then(() => console.log("connected to PostgresSQL db..."))
        .catch((err) => console.log("failed to connect to PostgresSQL db: ", err));
    
        app.get("/", (req, res) => {
        res.send("<h1>Hi guess who i am :D</h1>");
        });
    
        app.listen(PORT, () => console.log(`Hi Hi! from ${PORT}`));
        ```
- Sure, you can search for more details about the usage of each service. Here, it just explains how to communicate between Docker and different services.


<a name="desc12"></a>
## Docker with Laravel

- Laravel provides [Sail](https://laravel.com/docs/9.x/sail), a built-in solution for running your Laravel project using Docker.
- You can choose your sail services.
    - Go to the [Installation](https://laravel.com/docs/9.x#choosing-your-sail-services) and choose the suitable operating system.
    - ```curl -s https://laravel.build/example-app?with=mysql,redis | bash```, for Linux.
    - After installation is done: Dive in with: ```cd example-app && ./vendor/bin/sail up```
    - You can find the code in the ```Laravel Sail``` folder.

<a name="desc13"></a>
## Setup Docker on AWS EC2 and deploy the node application to the server.

- Simply:
  - Set up an Ubuntu server using the Amazon Elastic Compute Cloud service.
  - [Install Docker on our server](https://support.netfoundry.io/hc/en-us/articles/360057865692-Installing-Docker-and-docker-compose-for-Ubuntu-20-04).
  - Clone the node app from github.
  - run and build docker-compose file.
  - Check the figure for more details.
  
      <img alt="EC2_1" src="assets/EC2_1.png" /><br><br>
      <img alt="EC2_2" src="assets/EC2_2.png" /><br><br>
      <img alt="EC2_1,2" src="assets/EC2_1,2.png" /><br><br>


<a name="desc14"></a>
## Push Images to DockerHub

- In the last part, we found that we were building and running the image on the server, which is a waste of server resources, so we want to build the image somewhere other than the server.
- So the good scenario is that the image should first be pulled from somewhere, and then it should be run on the server.
    - We can do that using:
        - Amazon Elastic Container Registry (Amazon ECR).
        - Docker hub.
- Check the figure for more details.

     <img alt="pushImageToDokcerHub_1" src="assets/pushImageToDokcerHub_1.png" /><br><br>
     <img alt="pushImageToDokcerHub_2" src="assets/pushImageToDokcerHub_2.png" /><br><br>
     <img alt="pushImageToDokcerHub_3" src="assets/pushImageToDokcerHub_3.png" /><br><br>
      

<a name="desc15"></a>
## Load Balancing with Nginx.

- Check the figure for more details.

     <img alt="Load Balancing" src="assets/Load Balancing.png" /><br><br>
     <img alt="Load Balancing" src="assets/Load Balancing_1.png" /><br><br>
     <img alt="Load Balancing" src="assets/Load Balancing_2.png" /><br><br>
     <img alt="Load Balancing" src="assets/Load Balancing_3.png" /><br><br>
     
     
<a name="desc16"></a>
## Automate Docker Deployment

- When using [Watchtower](https://containrrr.dev/watchtower/), Once you have pushed your image to Docker Hub, the server can pull the changes automatically.
- Watchtower is itself packaged as a Docker container, so installation is just pulling the ```containrrr/watchtower``` image.

- Run  [Watchtower](https://containrrr.dev/watchtower/) Continer.

```
ubuntu@ip-172-31-51-54:~/naruto-server$ docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_POLL_INTERVAL=30 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower express-node-app-container
Unable to find image 'containrrr/watchtower:latest' locally
latest: Pulling from containrrr/watchtower
7e1f4ce8770d: Pull complete 
cc408d374d64: Pull complete 
4412f0a27731: Pull complete 
Digest: sha256:0ca7a88fd0748aa6f32e50b67eb11148cdb989fc595264c2778c85297a2c1abe
Status: Downloaded newer image for containrrr/watchtower:latest
1a4c331c4d04caf8831d3ed12068ddad0e29cbb263d8da8716cdfa26be9e305a
ubuntu@ip-172-31-51-54:~/naruto-server$ sudo docker ps
CONTAINER ID   IMAGE                   COMMAND                  CREATED          STATUS          PORTS      NAMES
1a4c331c4d04   containrrr/watchtower   "/watchtower express…"   21 seconds ago   Up 19 seconds   8080/tcp   watchtower
ubuntu@ip-172-31-51-54:~/naruto-server$ 

```

- Now, once you have pushed the new image to Docker Hub, the server can pull the changes automatically.


```

ubuntu@ip-172-31-51-54:~/naruto-server$ sudo docker logs watchtower
time="2023-02-07T06:30:52Z" level=debug msg="Sleeping for a second to ensure the docker api client has been properly initialized."
time="2023-02-07T06:30:53Z" level=debug msg="Making sure everything is sane before starting"
time="2023-02-07T06:30:53Z" level=debug msg="Retrieving running containers"
time="2023-02-07T06:30:53Z" level=debug msg="There are no additional watchtower containers"
time="2023-02-07T06:30:53Z" level=debug msg="Watchtower HTTP API skipped."
time="2023-02-07T06:30:53Z" level=info msg="Watchtower 1.5.3"
time="2023-02-07T06:30:53Z" level=info msg="Using no notifications"
time="2023-02-07T06:30:53Z" level=info msg="Only checking containers which name matches \"express-node-app-container\""
time="2023-02-07T06:30:53Z" level=info msg="Scheduling first run: 2023-02-07 06:31:23 +0000 UTC"
time="2023-02-07T06:30:53Z" level=info msg="Note that the first check will be performed in 29 seconds"
time="2023-02-07T06:30:53Z" level=warning msg="Trace level enabled: log will include sensitive information as credentials and tokens"
time="2023-02-07T06:31:23Z" level=debug msg="Checking containers for updated images"
time="2023-02-07T06:31:23Z" level=debug msg="Retrieving running containers"
time="2023-02-07T06:31:23Z" level=info msg="Session done" Failed=0 Scanned=0 Updated=0 notify=no
time="2023-02-07T06:31:23Z" level=debug msg="Scheduled next run: 2023-02-07 06:31:53 +0000 UTC"
time="2023-02-07T06:31:53Z" level=debug msg="Checking containers for updated images"
time="2023-02-07T06:31:53Z" level=debug msg="Retrieving running containers"
time="2023-02-07T06:31:53Z" level=info msg="Session done" Failed=0 Scanned=0 Updated=0 notify=no
time="2023-02-07T06:31:53Z" level=debug msg="Scheduled next run: 2023-02-07 06:32:23 +0000 UTC"
time="2023-02-07T06:32:23Z" level=debug msg="Checking containers for updated images"
time="2023-02-07T06:32:23Z" level=debug msg="Retrieving running containers"
time="2023-02-07T06:32:23Z" level=info msg="Session done" Failed=0 Scanned=0 Updated=0 notify=no
time="2023-02-07T06:32:23Z" level=debug msg="Scheduled next run: 2023-02-07 06:32:53 +0000 UTC"

```

- The image is automatically pulled in this case.

```
time="2023-02-07T07:21:10Z" level=debug msg="Pulling image" container=/express-node-app-container image="mo201/node-app-docker:latest"
```


<a name="desc17"></a>
## How CI/CD Works

- CI/CD: Continuous integration (CI) and continuous delivery or deployment (CD)
- CI/CD is a process that ensures that you will not have problems when adding new features to your application.
    - In the CI stage, the feature is tested; are all test cases correct, or should it be reconsidered?
    - If everything is ok, the feature will be merged with the main branch, and it will be ready to go to the next stage, which is called CD.
    - That's it in brief.


<a name="desc18"></a>
## Docker Orchestration

-  Docker Orchestration, its management layer, gives you more features than Docker.
    - It makes the deployment process easier by being responsible for creating and running the servers. You only have to specify the cloud provider and the docker compose file.
    - Responsible for scaling up or down the application if required.
    - Create a load balancer and manage the traffic automatically.
    - The communication between the containers and any external resource is managed automatically.
    - Detect any error in any container on the server and deal with it.
    - The update policy is specified.
    - So we note that the Docker orchestration will manage all of this. 
        - deployment.
        - scaling. 
        - networking. 
        - errors.
        - updates.
     - Examples of Docker orchestration technologies.
        - [Docker Swarm.](https://docs.docker.com/engine/swarm/key-concepts/)
        - [Kubernetes.](https://kubernetes.io/)


<a name="desc19"></a>
## Docker Swarm

- Check out the figure.

<img alt="Docker Swarm.png" src="assets/Docker Swarm.png" /><br><br>

- Note that Docker Swarm comes with Docker by default, but by default it is ```inactive```, so you have to activate it as follows:


```
ubuntu@ip-172-31-51-54:~$ docker swarm init
Swarm initialized: current node (swum4h7tying0puihmos666a7) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-0g8yk6n7gz2i5duoobeobx7gupphd9t7xdw4780g6zgvi0ccfm-bl2b9w9smx5z51bv33rgr0403 172.31.51.54:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

- Other command lines in Docker Swarm and their uses:

```
ubuntu@ip-172-31-51-54:~$ docker swarm --help

Usage:  docker swarm COMMAND

Manage Swarm

Commands:
  ca          Display and rotate the root CA
  init        Initialize a swarm
  join        Join a swarm as a node and/or manager
  join-token  Manage join tokens
  leave       Leave the swarm
  unlock      Unlock swarm
  unlock-key  Manage the unlock key
  update      Update the swarm

Run 'docker swarm COMMAND --help' for more information on a command.

```

- To begin using Docker Swarm on the server, the commands begin with ```docker service```; let's list all of them.

```
ubuntu@ip-172-31-51-54:~$ docker service --help

Usage:  docker service COMMAND

Manage Swarm services

Commands:
  create      Create a new service
  inspect     Display detailed information on one or more services
  logs        Fetch the logs of a service or task
  ls          List services
  ps          List the tasks of one or more services
  rm          Remove one or more services
  rollback    Revert changes to a service's configuration
  scale       Scale one or multiple replicated services
  update      Update a service

Run 'docker service COMMAND --help' for more information on a command.
```

- To use Docker Swarm, first of all, you have to create a stack that acts like "docker-compose." the commands begin with ```docker stack```; let's list all of them.

```
ubuntu@ip-172-31-51-54:~$ docker stack --help

Usage:  docker stack COMMAND

Manage Swarm stacks

Commands:
  config      Outputs the final config file, after doing merges and interpolations
  deploy      Deploy a new stack or update an existing stack
  ls          List stacks
  ps          List the tasks in the stack
  rm          Remove one or more stacks
  services    List the services in the stack

Run 'docker stack COMMAND --help' for more information on a command.
```

<a name="desc20"></a>
## Rolling Update
- When you want to release a new version of your application and deploy a new version to the server, the server should still be running anyway. so we use a rolling update.
- Note that the Docker Swarm commands can be used within Docker compose because Docker Swarm is included with Docker. 
- Now, let's edit Docker Combos a little:


```
version: "3"
services:
  node-app: 
    container_name: express-node-app-container
    image: mo201/node-app-docker
    ports: 
      - "4000:4000"
    env_file:
      - ./.env
    deploy:
      replicas: 4
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure
        delay: 5s
    depends_on:
      - redis
      - mongo

  mongo:
   image: mongo
   restart: always
   volumes:
    - mongo-db:/data/db #Named volume
   environment:
     MONGO_INITDB_ROOT_USERNAME: root
     MONGO_INITDB_ROOT_PASSWORD: example    

  redis:
    image: redis
  
  nginx:
    image: nginx:stable-alpine
    ports:
    - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - node-app
volumes:
  mongo-db: 
  postgres-db:

```

- In the deploy section, you can see:

1. replicas
   - How many replicas do you want for this service? 
2. update_config
   - Configures how the service should be updated. 
   - parallelism: How many containers are updated at the same time?
3. restart_policy
   - Configures if and how to restart containers when they exit. 
There are many management and restriction options, of course; see [Docker Docs](https://docs.docker.com/compose/compose-file/compose-file-v3/).

- Let's go to the server side.

    - deploy new stack
    
    ```
     ubuntu@ip-172-31-51-54:~/naruto-server$ docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml express-app
     Ignoring unsupported options: build, restart
    
     Ignoring deprecated options:

     container_name: Setting the container name is not supported.

     Creating network express-app_default
     Creating service express-app_mongo
     Creating service express-app_nginx
     Creating service express-app_node-app
     Creating service express-app_redis
    ```
    
    - list all stacks
    
    ``
    ubuntu@ip-172-31-51-54:~/naruto-server$ docker stack ls
    NAME          SERVICES
    express-app   4  
    ``
    
    - all services inside the stack
    
    ```
    ubuntu@ip-172-31-51-54:~/naruto-server$ docker stack services express-app
    ID             NAME                   MODE         REPLICAS   IMAGE                          PORTS
    xreuzburf8s6   express-app_mongo      replicated   1/1        mongo:latest                   
    i3p04051gloz   express-app_nginx      replicated   1/1        nginx:stable-alpine            *:80->80/tcp
    z15o796dlb5p   express-app_node-app   replicated   4/4        mo201/node-app-docker:latest   *:4000->4000/tcp
    flt2dby1rj5o   express-app_redis      replicated   1/1        redis:latest                   
    ```
    
    - list all running containers 
    
    ```
    ubuntu@ip-172-31-51-54:~/naruto-server$ docker stack ps express-app
    ID             NAME                      IMAGE                          NODE              DESIRED STATE   CURRENT STATE           ERROR                       PORTS
    j90bgqsojw3n   express-app_mongo.1       mongo:latest                   ip-172-31-51-54   Running         Running 6 minutes ago                               
    zyavh1sh7056   express-app_nginx.1       nginx:stable-alpine            ip-172-31-51-54   Running         Running 7 minutes ago                               
    040e20btmy9o    \_ express-app_nginx.1   nginx:stable-alpine            ip-172-31-51-54   Shutdown        Failed 7 minutes ago    "task: non-zero exit (1)"   
    oivkydzu0jdm   express-app_node-app.1    mo201/node-app-docker:latest   ip-172-31-51-54   Running         Running 7 minutes ago                               
    mqoozc9if55b   express-app_node-app.2    mo201/node-app-docker:latest   ip-172-31-51-54   Running         Running 7 minutes ago                               
    ohhnom2srsaf   express-app_node-app.3    mo201/node-app-docker:latest   ip-172-31-51-54   Running         Running 7 minutes ago                               
    v6rn7scd4ex3   express-app_node-app.4    mo201/node-app-docker:latest   ip-172-31-51-54   Running         Running 7 minutes ago                               
    b43fcx47pfze   express-app_redis.1       redis:latest                   ip-172-31-51-54   Running         Running 7 minutes ago                               
    ```
    
   -  Now let's release a new vision for our app and see the rolling update.
     
      <img alt="new version" src="assets/new version.png" /><br><br>

<p align="center">
  Feel free to contribute to the repository if you find something wrong or have a better explanation.
  <img  width="500px"  src="assets/Final.png" />
</p>
