using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class NetworkConnection
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }
    public int NumberId { get; set; }
    public int Element1 { get; set; }
    public int Element2 { get; set; }
    public DateTime Timestamp { get; set; }
}
