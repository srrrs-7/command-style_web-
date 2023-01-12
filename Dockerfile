# Node 16.x
ARG NODE_VERSION=19-alpine

# deps
FROM node:$NODE_VERSION AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# builder
FROM node:$NODE_VERSION AS builder
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Run phase
FROM node:$NODE_VERSION AS runnner
RUN apk add --no-cache python3 make g++
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
ENV NODE_ENV production
ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["node", "server.js"]