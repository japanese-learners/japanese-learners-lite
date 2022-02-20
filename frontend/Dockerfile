FROM mhart/alpine-node:14.17

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM mhart/alpine-node:14.17

WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=0 /app/build .

CMD ["node", "."]