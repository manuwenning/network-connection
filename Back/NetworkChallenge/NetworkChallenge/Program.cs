using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Lê a connection string do appsettings.json
var mongoDbConnectionString = builder.Configuration.GetConnectionString("MongoDb");

// Registra o MongoDB client no container de serviços
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
    new MongoClient(mongoDbConnectionString));

// Configura o CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());
});

// Registra os serviços do Swagger, controladores e API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuração do Swagger para ambientes de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Aplica o CORS
app.UseCors("AllowAllOrigins");

// Configura os middlewares de redirecionamento de HTTPS e autorização
app.UseHttpsRedirection();
app.UseAuthorization();

// Mapeia os controladores
app.MapControllers();

app.Run();



