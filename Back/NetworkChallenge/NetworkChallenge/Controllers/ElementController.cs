using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChallengeRegisterAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NetworkController : ControllerBase
    {
        private readonly IMongoCollection<NetworkConnection> _networkCollection;

        public NetworkController(IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase("challengeRegister");
            _networkCollection = database.GetCollection<NetworkConnection>("networkRegister");
        }

        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<object>>> ListConnections()
        {
            try
            {
                var connections = await _networkCollection.Find(_ => true).ToListAsync();
                var result = connections.Select(c => new
                {
                    Id = c.Id.ToString(),
                    c.NumberId,
                    c.Element1,
                    c.Element2,
                    c.Timestamp
                });

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: lista não encontrada - {ex.Message}");
            }
        }

        [HttpPost("add")]
        public async Task<ActionResult<NetworkConnection>> AddConnection([FromBody] NetworkConnection connection)
        {
            try
            {
                if (connection.Element1 < 1 || connection.Element1 > 8 ||
                    connection.Element2 < 1 || connection.Element2 > 8)
                {
                    return BadRequest("Os valores de Element1 e Element2 devem estar entre 1 e 8.");
                }
                else
                {
                    var alreadyConnected = await _networkCollection.Find(c =>
                        (c.Element1 == connection.Element1 && c.Element2 == connection.Element2) ||
                        (c.Element1 == connection.Element2 && c.Element2 == connection.Element1)
                    ).FirstOrDefaultAsync();

                    if (alreadyConnected != null)
                    {
                        return Conflict("A conexão já existe.");
                    }

                    var totalConnections = await _networkCollection.CountDocumentsAsync(FilterDefinition<NetworkConnection>.Empty);
                    connection.NumberId = (int)totalConnections + 1;

                    connection.Timestamp = DateTime.UtcNow;
                    await _networkCollection.InsertOneAsync(connection);

                    return CreatedAtAction(nameof(ListConnections), new { id = connection.Id }, connection);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao adicionar conexão: {ex.Message}");
            }
        }

        [HttpDelete("remove/{id}")]
        public async Task<ActionResult> RemoveConnection(string id)
        {
            try
            {
                if (!ObjectId.TryParse(id, out ObjectId objectId))
                {
                    return BadRequest("ID inválido.");
                }

                var result = await _networkCollection.DeleteOneAsync(c => c.Id == objectId);

                if (result.DeletedCount == 0)
                    return NotFound("Conexão não encontrada.");

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao remover conexão: {ex.Message}");
            }
        }
    }
}
