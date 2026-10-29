FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY *.html server.js ./
COPY api api
COPY assets assets
COPY data data
USER node
EXPOSE 3000
CMD ["node", "server.js"]
