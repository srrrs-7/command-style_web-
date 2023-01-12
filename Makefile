dev:
	yarn dev -p 3000
build:
	docker build . -t next_app
run:
	docker run --name next_app -p 3000:3000 --user 1001 -d next_app
exec:
	docker exec -it next-app sh
images:
	docker images
rm:
	docker rmi $(id) -f
ps:
	doker ps -a

# nginx
ngx:
	docker build ./nginx -t nginx-app

# docker-compose
dc_build:
	docker-compose build .
dc_up:
	docker-compose up -d

PHONY: dev, build, run, images, rm, ps