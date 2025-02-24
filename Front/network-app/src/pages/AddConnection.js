import React, { useState } from "react";

function AddConnection() {
  const [element1, setElement1] = useState(""); // Campo Element1
  const [element2, setElement2] = useState(""); // Campo Element2
  const [status, setStatus] = useState(""); // Status da resposta da API

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newConnection = {
      element1: parseInt(element1), // Convertendo para número
      element2: parseInt(element2), // Convertendo para número
    };
  
    try {
      const response = await fetch("https://network-back-production.up.railway.app/api/network/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newConnection),
      });
  
      if (response.ok) {
        const result = await response.json();
        setStatus("Conexão adicionada com sucesso!");
        setElement1("");
        setElement2("");
      } else {
        const text = await response.text();
        setStatus(text || "Erro desconhecido.");
      }
    } catch (error) {
      setStatus("Erro ao conectar com a API.");
    }
  };
  

  return (
    <div>
      <h1>Adicionar Conexão</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Element1</label>
          <input
            type="number"
            value={element1}
            onChange={(e) => setElement1(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Element2</label>
          <input
            type="number"
            value={element2}
            onChange={(e) => setElement2(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default AddConnection;
