# Desafio-Microserviços
como subir, testar e derrubar tudo

# como subir nginx
docker build -t gateway-nginx ./gateway
docker run -d --name gateway -p 80:80 gateway-nginx