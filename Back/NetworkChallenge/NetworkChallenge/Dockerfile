# Usa uma imagem base do .NET SDK para construção
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /src

# Copia o arquivo .csproj e restaura as dependências
COPY ./Back/NetworkChallenge/NetworkChallenge.csproj ./NetworkChallenge/
WORKDIR /src/NetworkChallenge

# Verifica se o .csproj está no diretório correto
RUN ls -al /src/NetworkChallenge

# Restaura as dependências
RUN dotnet restore

# Construa o projeto
RUN dotnet build NetworkChallenge.csproj -c Release -o /app/build

