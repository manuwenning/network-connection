import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

function FindConnections() {
    const [element1, setElement1] = useState("");
    const [element2, setElement2] = useState("");
    const [connections, setConnections] = useState({
        direct: [],
        indirect: [],
    });
    const [error, setError] = useState("");
    const [buttonColor, setButtonColor] = useState("#333333");
    const [buttonColorBack, setButtonColorBack] = useState("#333333");
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Botão clicado!");
        setError("");

        if (element1 < 1 || element1 > 8 || element2 < 1 || element2 > 8) {
            setError("Os elementos devem estar entre 1 e 8.");
            return;
        }

        if (element1 === element2) {
            setError("Os elementos não podem ser iguais.");
            return;
        }

        try {
            let directConnections = [];
            try {
                const directResponse = await axios.get(`${BASE_URL}/findDirect`, {
                    params: { element1, element2 },
                    headers: { Accept: "application/json" },
                });

                // Verifica se a resposta é realmente JSON
                if (directResponse.headers["content-type"].includes("application/json")) {
                    directConnections = directResponse.data;
                } else {
                    console.error("Resposta não é JSON:", directResponse.data);
                    directConnections = ["Erro ao buscar conexões diretas."];
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    directConnections = ["Nenhuma conexão direta encontrada."];
                } else {
                    console.error("Erro ao buscar conexões diretas:", error);
                    directConnections = ["Erro na API."];
                }
            }

            let indirectConnections = [];
            try {
                const indirectResponse = await axios.get(`${BASE_URL}/findIndirect`, {
                    params: { element1, element2 },
                    headers: { Accept: "application/json" },
                });

                if (indirectResponse.headers["content-type"].includes("application/json")) {
                    indirectConnections = indirectResponse.data;
                } else {
                    console.error("Resposta não é JSON:", indirectResponse.data);
                    indirectConnections = ["Erro ao buscar conexões indiretas."];
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    indirectConnections = ["Nenhuma conexão indireta encontrada."];
                } else {
                    console.error("Erro ao buscar conexões indiretas:", error);
                    indirectConnections = ["Erro na API."];
                }
            }

            setConnections({
                direct: directConnections,
                indirect: indirectConnections,
            });

            setHasSearched(true);
        } catch (err) {
            setError("Erro ao buscar as conexões.");
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

            <h1 style={{ fontSize: "28px", color: "#fff", marginBottom: "20px" }}>Buscar Conexões</h1>
            <h2 style={{ fontSize: "18px", color: "#fff", marginBottom: "20px" }}>Preencha os campos abaixo para buscar conexões entre os elementos.</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px", color: "#fff" }}>Elemento 1</label>
                    <input
                        type="number"
                        value={element1}
                        onChange={(e) => setElement1(e.target.value)}
                        required
                        style={{
                            padding: "8px",
                            fontSize: "14px",
                            width: "100%",
                            borderRadius: "5px",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", marginBottom: "5px", color: "#fff" }}>Elemento 2</label>
                    <input
                        type="number"
                        value={element2}
                        onChange={(e) => setElement2(e.target.value)}
                        required
                        style={{
                            padding: "8px",
                            fontSize: "14px",
                            width: "100%",
                            borderRadius: "5px",
                        }}
                    />
                </div>
                <button
                    type="button"
                    onClick={() => {
                        setElement1("");
                        setElement2("");
                        setConnections({ direct: [], indirect: [] });
                        setError("");
                        setHasSearched(false);
                    }}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: buttonColor,
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onMouseEnter={() => setButtonColor("#555555")}
                    onMouseLeave={() => setButtonColor("#333333")}
                >
                    Limpar Consulta
                </button>
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: buttonColor,
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginLeft: "30px",
                    }}
                    onMouseEnter={() => setButtonColor("#555555")}
                    onMouseLeave={() => setButtonColor("#333333")}
                >
                    Buscar Conexões
                </button>
            </form>

            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <div className="connections-result">
                <h2 style={{ fontSize: "28px", color: "#fff" }}>Resultados</h2>

                {hasSearched && (
                    <>
                        <h4 style={{ color: "#fff" }}>Conexões Diretas:</h4>
                        {connections.direct.length > 0 ? (
                            <ul style={{ color: "#fff", padding: "0", listStyle: "none" }}>
                                {connections.direct.map((connection, index) => (
                                    <li key={index} style={{ marginBottom: "10px" }}>{connection}</li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: "#fff" }}>Nenhuma conexão direta encontrada.</p>
                        )}

                        <h4 style={{ color: "#fff" }}>Conexões Indiretas:</h4>
                        {connections.indirect.length > 0 ? (
                            <ul style={{ color: "#fff", padding: "0", listStyle: "none" }}>
                                {connections.indirect.map((connection, index) => (
                                    <li key={index} style={{ marginBottom: "10px" }}>{connection}</li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: "#fff" }}>Nenhuma conexão indireta encontrada.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default FindConnections;
