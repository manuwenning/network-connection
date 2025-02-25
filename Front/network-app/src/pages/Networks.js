import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar o hook useNavigate

function Networks() {
  const [connections, setConnections] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate(); // Instância do hook useNavigate para navegação

  // Função para buscar as conexões
  const fetchConnections = async () => {
    try {
      const response = await fetch("https://network-back-production.up.railway.app/api/Network/list");
      if (response.ok) {
        const result = await response.json();
        setConnections(result);
      } else {
        setStatus("Erro ao carregar conexões.");
      }
    } catch (error) {
      setStatus("Erro ao conectar com a API.");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Função para excluir uma conexão
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir esta conexão?");
    if (confirmDelete) {
      try {
        const response = await fetch(`https://network-back-production.up.railway.app/api/Network/remove/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setStatus("Conexão excluída com sucesso!");
          // Atualiza a lista após excluir
          fetchConnections();
        } else {
          setStatus("Erro ao excluir conexão.");
        }
      } catch (error) {
        setStatus("Erro ao conectar com a API.");
      }
    }
  };

  return (
    <div>
      {/* Botão Voltar com position fixed */}
      <button 
        onClick={() => navigate("/")} 
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#333333", // Cor de fundo grafite
          color: "#ffffff", // Cor da fonte para contraste
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      >
        Voltar
      </button>

      <h2>Conexões de Rede</h2>
      <p>{status}</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Element 1</th>
            <th>Element 2</th>
            <th>Excluir</th> {/* Título da coluna Alterado para "Excluir" */}
          </tr>
        </thead>
        <tbody>
          {connections.map((connection) => (
            <tr key={connection.id} style={{ borderBottom: "1px solid #fff" }}>
              {/* Coluna ID */}
              <td style={{ padding: "10px", borderRight: "2px solid #fff" }}>{connection.numberId}</td>

              {/* Coluna Element1 */}
              <td style={{ padding: "10px", textAlign: "center" }}>
                {connection.element1}
              </td>

              {/* Coluna Element2 */}
              <td style={{ padding: "10px", textAlign: "center" }}>
                {connection.element2}
              </td>

              {/* Coluna Excluir, com ícone de lixeira */}
              <td style={{ padding: "10px", textAlign: "center" }}>
                <button onClick={() => handleDelete(connection.id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Networks;
