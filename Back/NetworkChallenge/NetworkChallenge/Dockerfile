# Usa uma imagem base do .NET SDK para construção
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /src

COPY ./Back/NetworkChallenge/NetworkChallenge.csproj ./NetworkChallenge/

WORKDIR /src/NetworkChallenge

RUN dotnet restore

# Publica a aplicação (gera os arquivos necessários para execução)
RUN dotnet publish -c Release -o /app/publish

# Usa a imagem base do ASP.NET Core para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

# Copia os arquivos publicados da etapa anterior
COPY --from=build /app/publish .

# Comando de entrada para executar a API
ENTRYPOINT ["dotnet", "NetworkChallenge.dll"]


