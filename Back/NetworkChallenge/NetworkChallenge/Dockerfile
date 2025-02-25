# Usa a imagem base do .NET SDK para construção
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /src

# Copia apenas o .csproj primeiro para otimizar cache
COPY Back/NetworkChallenge/NetworkChallenge/NetworkChallenge.csproj NetworkChallenge/

RUN dotnet restore /src/NetworkChallenge/NetworkChallenge.csproj

# Copia todo o código do projeto
COPY ./Back/NetworkChallenge/ ./NetworkChallenge/

WORKDIR /src/NetworkChallenge

# Publica a aplicação (gera os arquivos necessários para execução)
RUN dotnet publish -c Release -o /app/publish --no-restore

# Usa a imagem base do ASP.NET Core para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

# Copia os arquivos publicados da etapa anterior
COPY --from=build /app/publish .

# Comando de entrada para executar a API
ENTRYPOINT ["dotnet", "NetworkChallenge.dll"]
