import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Importar o hook useNavigate

function AddConnection() {
  const [element1, setElement1] = useState(""); // Campo Element1
  const [element2, setElement2] = useState(""); // Campo Element2
  const [status, setStatus] = useState(""); // Status da resposta da API
  const input2Ref = useRef(null); // Referência para o segundo campo de input

  const navigate = useNavigate(); // Instância do hook useNavigate para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificando se os valores estão entre 1 e 8
    if (element1 < 1 || element1 > 8 || element2 < 1 || element2 > 8) {
      setStatus("Os valores de Element1 e Element2 devem estar entre 1 e 8.");
      // Limpando os campos de Element1 e Element2
      setElement1("");
      setElement2("");
      return;
    }

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

  // Função que será chamada quando o valor de element1 mudar
  const handleElement1Change = (e) => {
    setElement1(e.target.value);
    // Quando o campo de element1 não for vazio, move o foco para o input de element2
    if (e.target.value !== "") {
      input2Ref.current.focus();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
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
          backgroundColor: "#333333",
          border: "1px solid #ccc",
          borderRadius: "5px",
          zIndex: 10, // Para garantir que o botão fique acima de outros elementos
        }}
      >
        Voltar
      </button>

      <h1 style={{ fontSize: "28px", color: "#fff", marginBottom: "20px" }}>Adicionar Conexão</h1>
      <h2 style={{ fontSize: "18px", color: "#fff", marginBottom: "20px" }}>Preencha os campos abaixo para adicionar uma nova conexão.</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Element1</label>
          <input
            type="number"
            value={element1}
            onChange={handleElement1Change}
            required
            style={{ padding: "8px", fontSize: "14px", width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Element2</label>
          <input
            type="number"
            value={element2}
            onChange={(e) => setElement2(e.target.value)}
            required
            ref={input2Ref} // Atribui a referência ao segundo campo
            style={{ padding: "8px", fontSize: "14px", width: "100%" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#333", color: "#fff", border: "none", borderRadius: "5px" }}>
          Adicionar
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default AddConnection;
