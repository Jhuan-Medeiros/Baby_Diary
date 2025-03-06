import React from 'react';
import "./Rotina.css";

export const Rotina = () => {
  return (
    <div className='rotinaArea'>
        <div className='caixaAlimentação'>
            <h1>Alimentou-se</h1>
            <div className='horariosRotina'>
                <h2>Fruta 08:30 - 09:00</h2>
                <h2>Almoço 10:30 - 11:30</h2>
                <h2>Leite 12:30 - 13:00</h2>
                <h2>Lanche 14:30 - 16:00</h2>
                <h2>Porção de fruta</h2>    
            </div>
        </div>
    </div>
  )
}
