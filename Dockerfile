FROM node:22.14.0
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@18.2.0
COPY . .
EXPOSE 4200
CMD ["ng", "serve","--host=0.0.0.0"]