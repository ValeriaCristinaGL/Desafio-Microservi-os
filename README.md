# Desafio-Microserviços
como subir, testar e derrubar tudo

# Para o Serviço de Catálogo
# Como Subir
Para construir a imagem: docker build -t catalog-service ./catalog-service
Para executar o container: docker run -d --name catalog-service --network marketplace-net \
  -e DATABASE_URL=postgresql://admin:senha123@postgres-db:5432/marketplace \
  catalog-service



# Como Testar
Teste básico: curl http://localhost:5000/health
Ver todos os produtos: curl http://localhost:5000/catalog/items

# Como Derrubar
Parar os containers: docker stop catalog-service 
Parar e remover os containers: docker rm catalog-service 
Para remover tudo de uma vez: docker stop catalog-service && docker rm catalog-service 



