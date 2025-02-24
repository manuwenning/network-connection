import React, { useState, useEffect } from "react";

function Networks() {
  const [connections, setConnections] = useState([]);
  const [status, setStatus] = useState("");

  // Função para buscar as conexões
  const fetchConnections = async () => {
    try {
      const response = await fetch("hhttps://network-back-production.up.railway.app/api/network/list");
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
        const response = await fetch(`https://network-back-production.up.railway.app/api/network/remove/${id}`, {
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
      <h1>Conexões de Rede</h1>
      <p>{status}</p>
      <table>
        <thead>
          <tr>
            <th>ID Fictício</th>
            <th>Element 1</th>
            <th>Element 2</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {connections.map((connection) => (
            <tr key={connection.id}>
              <td>{connection.numberId}</td>
              <td>{connection.element1}</td>
              <td>{connection.element2}</td>
              <td>
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

