## groupadd for docker
- sudo groupadd docker
- sudo gpasswd -a $USER docker
- newgrp docker

- sudo systemctl start docker.service

- docker ps
- docker images
- docker run hello-world
- docker pull nginx
- docker run --name mynginx -p 8080:80 -d nginx
  - curl localhost:8080
  - cd /etc/nginx/ && vim nginx.conf
- docker attach <ID>
- docker restart <ID>
- docker rm -f <ID>
- docker port <ID>
- docker logs -f <ID>
- docker run -it archlinux /bin/bash
- docker info
- docker run -itd --name mylinux archlinux /bin/bash && docker attach mylinux

- docker system df
- docker image rm <ID>
- docker images -a
- docker logs <ID> or <ALIDAS>


## docker
docker start (ID)     # start docker’s software
docker run --name nginx-test -p 8080:80 -d nginx(镜像名称)
docker search software_name # search  software
docker rm id  # delete container
docker rmi id # delete images
docker rename old_name new_name    # 容器重新命名

docker_pull software_name # pull softname’s image

docker info       # check docker’s infomation

docker ps -a      # check docker image

docker ps

docker ps -s     # check 正在运行的容器 不加参数也是一样的


# name 容器名称   -p 端口进行映射，将本地的8080端口映射为容器内部的80端口
-d 设置容器在后台一直运行
访问本地的8080 端口的nginx服务    localhost：8080

- systemctl list-times --all
- echo $XDG_SECCION_TYPE # show x11
