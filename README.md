# Desafio-Microserviços
como subir, testar e derrubar tudo

# Users Service

Microserviço responsável pelo gerenciamento de **usuários** no sistema de marketplace.  

## 📂 Estrutura
users-service/
│── index.js # Código principal do serviço
│── package.json # Dependências e scripts
│── Dockerfile # Configuração para rodar em container
│── .dockerignore # Arquivos ignorados pelo Docker

🐳 Como rodar com Docker
1. Construir a imagem
```bash
docker build -t users-service ./users-service
```
2. Rodar o container
```bash
docker run -p 5000:5000 \
  -e DATABASE_URL="postgres://usuario:senha@host:porta/banco" \
  users-service
```

🔗 Endpoints disponíveis
Health check
Método	Rota	Descrição
GET	    /health	Verifica se o serviço está ativo

Usuários
Método	Rota	        Corpo (JSON)	                             Descrição
POST	/users/register	{ "username": "felipe", "password": "1234" } Registra novo usuário
POST	/users/login	{ "username": "felipe", "password": "1234" } Faz login do usuário

🧪 Testando
Registro de usuário
```bash
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"felipe","password":"1234"}'
```
```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"felipe","password":"1234"}'
```
```bash
curl http://localhost:5000/health
```

📌 Tecnologias

- Docker
- PostgreSQL (pg package)