FROM node:20-alpine

WORKDIR /frontend

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

# Build the production app
RUN npm run build

# Install 'serve' globally to serve the built app
RUN npm install -g serve

# Expose port 80 instead of 5173
EXPOSE 80

# Serve the app on port 80
CMD ["serve", "-s", "dist", "-l", "80"]
