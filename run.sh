docker-compose down
docker rmi -f $(docker images -f "dangling=true" -q)
docker-compose build
docker-compose up
