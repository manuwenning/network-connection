# Usando uma imagem base do Node.js
FROM node:16

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para o diretório de trabalho
COPY Front/network-app/package.json Front/network-app/package-lock.json /app/

# Instalar as dependências
RUN npm install

# Copiar o resto do código da aplicação
COPY Front/network-app /app

# Expôr a porta (caso necessário)
EXPOSE 3000

# Comando para rodar a aplicação (ajuste conforme necessário)
CMD ["npm", "start"]


