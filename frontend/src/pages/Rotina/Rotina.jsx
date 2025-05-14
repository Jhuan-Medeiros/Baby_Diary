import React, { useState } from 'react';
import "../Rotina/Rotina.css";

export const Rotina = () => {
    const [selected, setSelected] = useState({});
    const [evacuacao, setEvacuacao] = useState("");

    const handleSelection = (row, option) => {
        setSelected(prev => ({
            ...prev,
            [row]: option
        }));
    };

    const handleEvacuacaoChange = (option) => {
        setEvacuacao(option);
    };

    const rows = [
        "Fruta 8:30-9h",
        "Almoço 8:30-9h",
        "Leite 12:30-13h",
        "Lanche 12:30-13h",
        "Porção de fruta"
    ];

    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

    const opcoes = ["Aluno", "Aluno 2", "Aluno 3"];

    const handleChange = (event) => {
        setOpcaoSelecionada(event.target.value);
    };


    const evacuacaoOptions = ["Normal", "Seco", "Mole", "Líquido", "Não Evacuou"];

    return (
        <>

            <div className="titulo">
                <h1 id="cor-tit">Rotina do aluno</h1>
            </div>
            <hr />
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


            <div className="subtitulo">
                <h1 id="cor-sub">Alimentou-se</h1>
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
                                            checked={selected[index] === 'bom'}
                                            onChange={() => handleSelection(index, 'bom')}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            checked={selected[index] === 'pouco'}
                                            onChange={() => handleSelection(index, 'pouco')}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name={`row-${index}`}
                                            checked={selected[index] === 'nao quis'}
                                            onChange={() => handleSelection(index, 'nao quis')}
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
            <div class="observacoes">
                <textarea id="observacoes"></textarea>
            </div>

            <div class="enviarButao">
                <button id="enviar"><strong>Enviar</strong></button>
            </div>
        </>
    );
};
