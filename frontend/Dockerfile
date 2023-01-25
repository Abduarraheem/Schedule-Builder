FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]

# FROM nginx:latest
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# ENTRYPOINT [ "nginx", "-g", "daemon off;"]