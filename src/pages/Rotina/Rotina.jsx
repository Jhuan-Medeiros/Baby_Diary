import React, { useState } from 'react';
import "../Rotina/Rotina.css";

const Rotina = () => {
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

    const evacuacaoOptions = ["Normal", "Seco", "Mole", "Líquido", "Não Evacuou"];

    return (
        <>
            <div className="titulo">
                <h1 id="cor-tit">Rotina do aluno</h1>
            </div>
            <div className="subtitulo">
                <h1 id="cor-sub">Alimentou-se</h1>
            </div>
            <div className="tabela-rotina">
                <table>
                    <thead>
                        <tr>
                            <th>Refecção</th>
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

export default Rotina;
