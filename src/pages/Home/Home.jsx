import React, { useState } from 'react';
import "../Home/Home.css";
import NavbarProfessores from '../../components/navbarProfessores.jsx';

export const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const updateCalendar = (date) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    // Primeiro e último dia do mês
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    // Atualiza o mês e o ano
    const monthYearString = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    let datesHTML = '';

    // Preenche com os dias do mês anterior
    let prevDates = '';
    for (let i = firstDayIndex; i > 0; i--) {
      const prevDate = new Date(currentYear, currentMonth, 1 - i);
      prevDates += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    // Preenche os dias do mês atual
    let currentDates = '';
    for (let i = 1; i <= totalDays; i++) {
      const currentDay = new Date(currentYear, currentMonth, i);
      const activeClass = currentDay.toDateString() === new Date().toDateString() ? 'active' : '';
      currentDates += `<div class="date ${activeClass}">${i}</div>`;
    }

    // Preenche com os dias do próximo mês
    let nextDates = '';
    for (let i = 1; i <= 7 - lastDayIndex - 1; i++) {
      const nextDate = new Date(currentYear, currentMonth + 1, i);
      nextDates += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }

    return {
      monthYearString,
      datesHTML: prevDates + currentDates + nextDates
    };
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const { monthYearString, datesHTML } = updateCalendar(currentDate);

  return (
    <div>
   
      <div className="notifacaçao">
        <h1 id="avisos">Avisos:</h1>
        <hr />
        <div className="alinhamento-noti">
          <img src="src/assets/img/logo.png" alt="logo" id="logo" />
          <div className="letras-coluna">
            <p>EMEI Meu Anjo</p>
            <p id="data">3 de março 2025</p>
          </div>
        </div>
        <p id="aviso-msg">Amanhã não teremos aula devido ao feriado de Carnaval.</p>
      </div>

      <div className="chat-inicial">
        <div className="alinhamento-chat">
          <img src="src/assets/img/perfil-chat.png" alt="perfil-chat" id="perfil-chat" />
          <div className="letras-coluna2">
            <h2>Professor Cururu</h2>
            <p id="info-chat">Filho com problema intestinal</p>
          </div>
        </div>
      </div>

      <div className="rotina-inicial">
        <div className="alinhamento-rotina">
          <img src="src/assets/img/rotina.png" alt="rotina" id="rotina" />
          <h1 id="letras-coluna3">Rotina</h1>
        </div>
      </div>

      <div className="container-calendario">
        <div className="calendario-inicial">
          <div className="cabeçalho-calendario">
            <button onClick={handlePrevMonth}>←</button>
            <div className="mesAno" id="mesAno">
              <span>{monthYearString}</span>
            </div>
            <button onClick={handleNextMonth}>→</button>
          </div>

          <div className="dias">
            <div className="dia">Seg</div>
            <div className="dia">Ter</div>
            <div className="dia">Qua</div>
            <div className="dia">Qui</div>
            <div className="dia">Sex</div>
            <div className="dia">Sab</div>
            <div className="dia">Dom</div>
          </div>
          <div className="datas" id="datas" dangerouslySetInnerHTML={{ __html: datesHTML }} />
        </div>
      </div>
      <NavbarProfessores></NavbarProfessores>
    </div>
  );
};
