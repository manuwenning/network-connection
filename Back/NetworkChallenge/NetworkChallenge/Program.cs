using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// L� a connection string do appsettings.json
var mongoDbConnectionString = builder.Configuration.GetConnectionString("MongoDb");

// Registra o MongoDB client no container de servi�os
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
    new MongoClient(mongoDbConnectionString));

// Registrar o resto dos servi�os
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
