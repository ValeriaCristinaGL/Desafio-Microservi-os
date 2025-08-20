# Usa a imagem oficial do Node.js versão 20 como base
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências do projeto para o container
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto para o container
COPY . .

# Expõe a porta 5000 para acesso externo ao container
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
