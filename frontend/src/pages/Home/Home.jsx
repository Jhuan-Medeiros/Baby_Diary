import React, { useState } from 'react';
import "../Home/Home.css";
import NavbarProfessores from '../../components/navbarProfessores.jsx';
import { createCalendario } from '../../services/services.js';


export const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formData, setFormData] = useState({
    data: '',
    titulo: '',
    evento: '',
    horario: ''
  });

  
  const [eventosDataSelecionada, setEventosDataSelecionada] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(null);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCalendario(formData.data, formData.titulo, formData.evento, formData.horario);
      alert("Evento adicionado com sucesso!");
      setFormData({ data: '', titulo: '', evento: '', horario: '' }); // limpar form
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
      alert("Erro ao adicionar evento.");
    }
  };


  const updateCalendar = (date) => {

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    // primeiro e último dia do mês
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    // ajusta para que a semana comece na segunda-feira
    const adjustedFirstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // se domingo (0), muda para 6 (último dia da semana)

    // atualiza o mês e o ano
    const monthYearString = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

    let datesHTML = '';

    // preenche com os dias do mês anterior
    let prevDates = '';
    for (let i = adjustedFirstDayIndex; i > 0; i--) {
      const prevDate = new Date(currentYear, currentMonth, 1 - i);
      prevDates += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    // preenche os dias do mês atual
    let currentDates = '';
    for (let i = 1; i <= totalDays; i++) {
      const currentDay = new Date(currentYear, currentMonth, i);
      const activeClass = currentDay.toDateString() === new Date().toDateString() ? 'active' : '';
      currentDates += `<div class="date ${activeClass}">${i}</div>`;
    }

    // preenche com os dias do próximo mês
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
    <div className='corpoHome'>

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
        <a id="rotina-style" href="rotina">
          <div className="alinhamento-rotina">
            <img src="src/assets/img/rotina.png" alt="rotina" id="rotina" />
            <h1 id="letras-coluna3">Rotina</h1>
          </div>
        </a>
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
      <div className="formulario-evento">
        <h2>Adicionar Evento</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={formData.titulo}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="evento"
            placeholder="Descrição do evento"
            value={formData.evento}
            onChange={handleInputChange}
            required
          />
          <input
            type="time"
            name="horario"
            value={formData.horario}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Adicionar Evento</button>
        </form>
      </div>

      <NavbarProfessores></NavbarProfessores>
    </div>
  );
};