import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/apiConfig";

function AddConnection() {
  const [element1, setElement1] = useState("");
  const [element2, setElement2] = useState("");
  const [status, setStatus] = useState("");
  const input2Ref = useRef(null);

  const [buttonColorBack, setButtonColorBack] = useState("#333333");
  const [buttonColorAdd, setButtonColorAdd] = useState("#333333");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newConnection = {
      element1: parseInt(element1),
      element2: parseInt(element2),
    };

    try {
      const response = await fetch(`${BASE_URL}/add`, {
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

  const handleElement1Change = (e) => {
    setElement1(e.target.value);

    if (e.target.value !== "") {
      input2Ref.current.focus();
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
          backgroundColor: buttonColorBack,
          color: '#fff',
          border: "1px solid #ccc",
          borderRadius: "5px",
          zIndex: 10,
        }}
        onMouseEnter={() => setButtonColorBack("#555555")}
        onMouseLeave={() => setButtonColorBack("#333333")}
      >
        Voltar
      </button>

      <h1 style={{ fontSize: "28px", color: "#fff", marginBottom: "20px" }}>Adicionar Conexão</h1>
      
      <h2 style={{ fontSize: "18px", color: "#fff", marginBottom: "20px" }}>Preencha os campos abaixo para adicionar uma nova conexão.</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#fff" }}>Element1</label>
          <input
            type="number"
            value={element1}
            onChange={handleElement1Change}
            required
            style={{ padding: "8px", fontSize: "14px", width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#fff" }}>Element2</label>
          <input
            type="number"
            value={element2}
            onChange={(e) => setElement2(e.target.value)}
            required
            ref={input2Ref}
            style={{ padding: "8px", fontSize: "14px", width: "100%" }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: buttonColorAdd,
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onMouseEnter={() => setButtonColorAdd("#555555")}
          onMouseLeave={() => setButtonColorAdd("#333333")}
        >
          Adicionar
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default AddConnection;
