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

# Expose port 5173 for serving the app
EXPOSE 5173

# Command to serve the app
CMD ["serve", "-s", "dist", "-l", "5173"]
