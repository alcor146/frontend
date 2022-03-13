FROM node:16.13

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
#RUN npm install express cors body-parser
RUN npm install -g
RUN npm install -g @angular/cli@12.2.14
RUN npm install --save-dev @angular-devkit/build-angular@12.2.14
COPY . .

EXPOSE 4200
CMD [ "ng", "serve", "--host", "0.0.0.0", "--disable-host-check" ]
