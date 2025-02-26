import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/apiConfig";

function Networks() {
  const [connections, setConnections] = useState([]);
  const [status, setStatus] = useState("");
  const [buttonColor, setButtonColor] = useState("#333333");
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const response = await fetch(`${BASE_URL}/list`);
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir esta conexão?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${BASE_URL}/remove/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setStatus("Conexão excluída com sucesso!");
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
    <div style={{ padding: "20px" }}>
      <button 
        onClick={() => navigate("/")} 
        style={{
          position: "fixed",
          top: "10px",
          left: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: buttonColor, // Usando o estado correto
          color: '#fff',
          border: "1px solid #ccc",
          borderRadius: "5px",
          zIndex: 10,
        }}
        onMouseEnter={() => setButtonColor("#555555")}
        onMouseLeave={() => setButtonColor("#333333")}
      >
        Voltar
      </button>

      <h2>Conexões de Rede</h2>
      <p>{status}</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Elemento 1</th>
            <th>Elemento 2</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((connection) => (
            <tr key={connection.id} style={{ borderBottom: "1px solid #fff" }}>
              <td style={{ padding: "10px", borderRight: "2px solid #fff" }}>
                {connection.numberId}
              </td>

              <td style={{ padding: "10px", textAlign: "center" }}>
                {connection.element1}
              </td>

              <td style={{ padding: "10px", textAlign: "center" }}>
                {connection.element2}
              </td>

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
