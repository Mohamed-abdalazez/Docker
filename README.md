# Docker


### 1. ```FROM node:14```
Inside the container, install node js.

### 2. ```WORKDIR /app```
Create Folder "app".

### 3. ```COPY package.json .```
copy package.json inside "app" Folder.

### 4. ```RUN npm install ```
RUN nmp install to install all the packages inside package.json -> node_modules.
