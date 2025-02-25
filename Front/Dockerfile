# Usa uma imagem base do Node.js para construir a aplicação
FROM node:16 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json (caso existam)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Constrói a aplicação para produção
RUN npm run build

# Usa uma imagem base do Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copia os arquivos construídos para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta em que o Nginx está rodando (geralmente 80)
EXPOSE 80

# Inicia o Nginx quando o container for rodado
CMD ["nginx", "-g", "daemon off;"]
