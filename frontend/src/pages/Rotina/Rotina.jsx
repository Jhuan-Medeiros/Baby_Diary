import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import "../Rotina/Rotina.css";
import { createRotina, getUsuarios } from "../../services/services.js";

export const Rotina = () => {
    const [selected, setSelected] = useState({});
    const [evacuacao, setEvacuacao] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [mensagemPopup, setMensagemPopup] = useState("");
    const [tipoPopup, setTipoPopup] = useState(""); //estilizaçao pop-up
    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAlunos, setFilteredAlunos] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [alunoConfirmadoId, setAlunoConfirmadoId] = useState(null);

    const navigate = useNavigate();

    const rows = [
        "Fruta 8:30-9h",
        "Almoço 8:30-9h",
        "Leite 12:30-13h",
        "Lanche 12:30-13h",
        "Porção de fruta"
    ];

    const evacuacaoOptions = ["Normal", "Seco", "Mole", "Líquido", "Não Defecou"];

    useEffect(() => {
        async function fetchAlunos() {
            try {
                const data = await getUsuarios();
                setAlunos(data);
            } catch (error) {
                console.error("Erro ao buscar alunos:", error);
            }
        }
        fetchAlunos();
    }, []);

    const mostrarPopup = (mensagem, tipo) => {
        setMensagemPopup(mensagem);
        setTipoPopup(tipo);
        setTimeout(() => {
            setMensagemPopup("");
            setTipoPopup("");
        }, 3000);
    };

    const handleSelection = (row, option) => {
        setSelected(prev => ({
            ...prev,
            [row]: option
        }));
    };

    const handleEvacuacaoChange = (option) => {
        setEvacuacao(option);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowResults(true);
        
        const filtered = alunos.filter(aluno => 
            aluno.nome.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredAlunos(filtered);
    };

    const selecionarAluno = (aluno) => {
        setAlunoSelecionado(aluno.nome);
        setSearchTerm(aluno.nome);
        setShowResults(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!alunoSelecionado) {
            mostrarPopup("Por favor, selecione um aluno.", "erro");
            return;
        }
        
        const todasRefeicoesPreenchidas = rows.every((row) => selected[row]);
        if (!todasRefeicoesPreenchidas) {
            mostrarPopup("Por favor, preencha todas as opções de alimentação.", "erro");
            return;
        }
        
        if (!evacuacao) {
            mostrarPopup("Por favor, selecione o tipo evacuação.", "erro");
            return;
        }
        
        const alimentacaoData = rows.reduce((acc, row, index) => {
            acc[row] = selected[index] || "";
            return acc;
        }, {});

        const data = {
            aluno: alunoSelecionado,
            alimentacao: alimentacaoData,
            evacuacao: evacuacao,
            observacoes: observacoes,
        };

        try {
            await createRotina(data);
            mostrarPopup("Rotina enviada com sucesso!", "sucesso");
            setTimeout(() => {
                navigate("/home");
            }, 3000);
        } catch (err) {
            console.error("Erro:", err);
            mostrarPopup("Erro ao enviar rotina.", "erro");
        }
    };

    return (
        <div className="container-rotina">
            <div className="titulo">
                <h1>Rotina Diária</h1>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Buscar aluno..."
                    className="search-input"
                />
            </div>

            {searchTerm && (
                <div className="lista-alunos">
                    {filteredAlunos.map((aluno) => (
                        <div key={aluno.id} className="aluno-item">
                            <span>{aluno.nome}</span>
                            <button
                                onClick={() => {
                                    if (alunoConfirmadoId === aluno.id) {
                                        setAlunoConfirmadoId(null); // desseleciona
                                    } else {
                                        selecionarAluno(aluno);
                                        setAlunoConfirmadoId(aluno.id); // seleciona
                                    }
                                }}
                                style={{
                                    backgroundColor: alunoConfirmadoId === aluno.id ? "green" : "",
                                    color: alunoConfirmadoId === aluno.id ? "white" : "",
                                }}
                            >
                                {alunoConfirmadoId === aluno.id ? "Confirmado" : "Confirmar"}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {alunoConfirmadoId && (
                <div className="aluno-selecionado" style={{ margin: "10px 0", padding: 8, background: "#e0ffe0", borderRadius: 6 }}>
                    <span>
                        Selecionado: {filteredAlunos.find(a => a.id === alunoConfirmadoId)?.nome || "Aluno"}
                    </span>
                    <button
                        style={{ marginLeft: 12, background: "red", color: "white", border: "none", borderRadius: 4, padding: "4px 10px" }}
                        onClick={() => setAlunoConfirmadoId(null)}
                        type="button"
                    >
                        Desselecionar
                    </button>
                </div>
            )}

            <div className="tabela">
                <form onSubmit={handleSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>Refeição</th>
                                <th>Bom</th>
                                <th>Pouco</th>
                                <th>Não quis</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row}</td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            checked={selected[row] === 'bom'}
                                            onChange={() => handleSelection(row, 'bom')}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            checked={selected[row] === 'pouco'}
                                            onChange={() => handleSelection(row, 'pouco')}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            checked={selected[row] === 'nao quis'}
                                            onChange={() => handleSelection(row, 'nao quis')}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>

            <div className="subtitulo">
                <h1 id="cor-sub">Fez cocô</h1>
            </div>
            <div className="radio-evacuacao">
                {evacuacaoOptions.map((option, index) => (
                    <div key={index} className="radio-option">
                        <input
                            type="radio"
                            name="evacuacao"
                            checked={evacuacao === option}
                            onChange={() => handleEvacuacaoChange(option)}
                        />
                        <div>{option}</div>
                    </div>
                ))}
            </div>

            <div className="subtitulo">
                <h1 id="cor-sub">Observações</h1>
            </div>
            <div className="observacoes">
                <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
            </div>

            <div className="enviarButao">
                <button id="enviar" onClick={handleSubmit}><strong>Enviar</strong></button>
            </div>

            {mensagemPopup && (
                <div className={`popup ${tipoPopup}`}>
                    {mensagemPopup}
                </div>
            )}
        </div>
    );
};