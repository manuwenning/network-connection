using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Adiciona suporte a Controllers e Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔹 Configuração do CORS (Permite todas as origens)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 🔹 Configuração do MongoDB
var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDB");
var mongoClient = new MongoClient(mongoConnectionString);
var database = mongoClient.GetDatabase("NomeDoBanco"); // Substitua pelo nome real do seu banco

// Disponibiliza o banco de dados no container de injeção de dependências
builder.Services.AddSingleton(database);

var app = builder.Build();

// 🔹 Ativa o CORS na aplicação
app.UseCors("AllowAllOrigins");

// 🔹 Configuração do Swagger apenas em desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers(); // Garante que os controllers sejam usados

app.Run();




