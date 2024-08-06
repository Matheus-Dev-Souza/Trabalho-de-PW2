# Use a imagem oficial do Node.js como base
FROM node:14

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o diretório de trabalho
COPY . .

# Expõe a porta na qual o servidor irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
