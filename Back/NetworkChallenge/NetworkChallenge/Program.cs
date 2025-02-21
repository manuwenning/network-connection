using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Driver;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Adiciona suporte a Controllers e Swagger
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Configuração do CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins", policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader();
            });
        });

        // Configuração do MongoDB
        var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDB");
        var mongoClient = new MongoClient(mongoConnectionString);
        var database = mongoClient.GetDatabase("challengeRegister");

        // Disponibiliza o banco de dados no container de injeção de dependências
        builder.Services.AddSingleton(database);

        var app = builder.Build();

        // Ativa o CORS
        app.UseCors("AllowAllOrigins");

        // Configuração do Swagger
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers(); // Garante que os controllers sejam usados

        // Inicia a aplicação
        app.Run();
    }
}
