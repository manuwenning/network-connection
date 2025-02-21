# Usa uma imagem base do .NET SDK para construção
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /src

# Corrige o caminho do .csproj para o diretório correto
COPY ./Back/NetworkChallenge/NetworkChallenge/NetworkChallenge.csproj /src/NetworkChallenge/

WORKDIR /src/NetworkChallenge

# Restaura as dependências do projeto
RUN dotnet restore

# Publica a aplicação (gera os arquivos necessários para execução)
RUN dotnet publish -c Release -o /app/publish

# Usa a imagem base do ASP.NET Core para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

# Copia os arquivos publicados da etapa anterior
COPY --from=build /app/publish .

# Exponha a porta que sua API vai rodar
EXPOSE 80

# Comando de entrada para executar a API
ENTRYPOINT ["dotnet", "NetworkChallenge.dll"]


