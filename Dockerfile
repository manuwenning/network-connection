WORKDIR /app

COPY Back/NetworkChallenge/NetworkChallenge.csproj Back/NetworkChallenge/

RUN dotnet restore Back/NetworkChallenge/NetworkChallenge.csproj

COPY . .

WORKDIR /app/Back/NetworkChallenge

RUN dotnet publish -c Release -o out

ENTRYPOINT ["dotnet", "out/NetworkChallenge.dll"]

