FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY ./Back/NetworkChallenge/NetworkChallenge/NetworkChallenge.csproj ./NetworkChallenge/
RUN dotnet restore ./NetworkChallenge/NetworkChallenge.csproj

COPY ./Back/NetworkChallenge/NetworkChallenge/ ./NetworkChallenge/
WORKDIR /src/NetworkChallenge
RUN dotnet build NetworkChallenge.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish NetworkChallenge.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NetworkChallenge.dll"]
