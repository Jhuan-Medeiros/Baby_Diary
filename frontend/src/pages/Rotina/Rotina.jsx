import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import "../Rotina/Rotina.css";
import { createRotina } from "../../services/services.js";

export const Rotina = () => {
    const [selected, setSelected] = useState({});
    const [evacuacao, setEvacuacao] = useState("");
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [mensagemPopup, setMensagemPopup] = useState("");
    const [tipoPopup, setTipoPopup] = useState(""); //estilizaçao pop-up

    const navigate = useNavigate();



    const rows = [
        "Fruta 8:30-9h",
        "Almoço 8:30-9h",
        "Leite 12:30-13h",
        "Lanche 12:30-13h",
        "Porção de fruta"
    ];

    const opcoes = ["Aluno", "Aluno 2", "Aluno 3"];
    const evacuacaoOptions = ["Normal", "Seco", "Mole", "Líquido", "Não Defecou"];

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

    const handleChange = (event) => {
        setOpcaoSelecionada(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!opcaoSelecionada) {
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
            aluno: opcaoSelecionada,
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
        <>
            <div className="titulo">
                <h1 id="cor-tit">Rotina do aluno</h1>
            </div>
            <div className="dropdown-container">
                <label htmlFor="dropdown" className="dropdown-label">Selecione o aluno para enviar:</label>
                <select
                    id="dropdown"
                    value={opcaoSelecionada}
                    onChange={handleChange}
                    className="dropdown-select"
                >
                    <option value="" disabled>Selecione...</option>
                    {opcoes.map((opcao, index) => (
                        <option key={index} value={opcao}>{opcao}</option>
                    ))}
                </select>

                {opcaoSelecionada && (
                    <p className="dropdown-info"><strong>{opcaoSelecionada}</strong></p>
                )}
            </div>
            <div className="tabela-rotina">
                <form>
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

        </>
    );
};
