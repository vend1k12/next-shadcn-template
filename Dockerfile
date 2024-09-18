FROM node:20-alpine AS builder

ENV NODE_ENV=build
RUN corepack enable
USER node
WORKDIR /app

COPY --chown=node:node package.json ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .
RUN yarn build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

ENV NODE_ENV=production

EXPOSE 5000

CMD yarn start