import React, { useEffect, useState } from 'react';
import { getCalendarioByDate, createCalendario, deleteCalendario } from '../../services/services.js';
import NavbarProfessores from '../../components/navbarProfessores.jsx';
import '../Home/Home.css';

export const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({ data: '', titulo: '', evento: '', horario: '' });
  const [modalAberto, setModalAberto] = useState(false);

  const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  const carregarEventos = async (data) => {
    try {
      const eventosData = await getCalendarioByDate(data);
      setEventos(eventosData);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const handleDateClick = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dataSelecionada = new Date(year, month, day).toISOString().split('T')[0];
    setSelectedDate(dataSelecionada);
    setFormData(prev => ({ ...prev, data: dataSelecionada }));
    carregarEventos(dataSelecionada);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCalendario(formData.data, formData.titulo, formData.evento, formData.horario);
      setModalAberto(false);
      carregarEventos(formData.data);
      setFormData({ data: '', titulo: '', evento: '', horario: '' });
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
    }
  };

  const handleDelete = async (data) => {
    try {
      await deleteCalendario(data);
      carregarEventos(selectedDate);
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
    }
  };

  

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
  
    const startDay = (firstDay.getDay() + 6) % 7; // Ajuste para começar na segunda
    const daysArray = [];
  
    const prevLastDay = new Date(year, month, 0).getDate(); // Último dia do mês anterior
  
    // Dias do mês anterior
    for (let i = startDay - 1; i >= 0; i--) {
      daysArray.push(
        <div key={`prev-${i}`} className="date other-month">
          {prevLastDay - i}
        </div>
      );
    }
  
    // Dias do mês atual
    for (let i = 1; i <= totalDays; i++) {
      const isToday = new Date().toDateString() === new Date(year, month, i).toDateString();
      daysArray.push(
        <button
          key={`curr-${i}`}
          className={`date ${isToday ? 'active2' : ''}`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </button>
      );
    }
  
    // Dias do próximo mês para completar 42 dias
    const totalSlots = 42;
    const remaining = totalSlots - daysArray.length;
  
    for (let i = 1; i <= remaining; i++) {
      daysArray.push(
        <div key={`next-${i}`} className="date other-month">
          {i}
        </div>
      );
    }
  
    return daysArray;
  };
  

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const monthYearString = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className='corpoHome'>

      {/* Sessão de avisos fixos */}
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

      {/* Chat fixo com professor */}
      <div className="chat-inicial">
        <div className="alinhamento-chat">
          <img src="src/assets/img/perfil-chat.png" alt="perfil-chat" id="perfil-chat" />
          <div className="letras-coluna2">
            <h2>Professor Cururu</h2>
            <p id="info-chat">Filho com problema intestinal</p>
          </div>
        </div>
      </div>

      {/* Acesso à rotina */}
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
            <div className="mesAno"><span>{monthYearString}</span></div>
            <button onClick={handleNextMonth}>→</button>
          </div>

          <div className="dias">{diasSemana.map(dia => <div key={dia} className="dia">{dia}</div>)}</div>

          <div className="datas">{renderCalendar()}</div>

          {selectedDate && (
            <div className="eventos-data">
              <h3 id="eventos-do-dia">Eventos de {selectedDate}</h3>
              {eventos.length === 0 ? (
                <p>Sem eventos nesta data.</p>
              ) : (
                eventos.map((ev, i) => (
                  <div key={i} className="evento">
                    <p><strong>{ev.titulo}</strong> - {ev.evento} às {ev.horario}</p>
                    <button onClick={() => handleDelete(ev.data)}>Excluir</button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <button className="btn-abrir-form" onClick={() => setModalAberto(true)}>
        <strong>Novo Evento</strong>
      </button>

      {/* Modal para novo evento */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-conteudo">
            <button className="btn-fechar" onClick={() => setModalAberto(false)}>×</button>
            <h2>Adicionar Evento</h2>
            <form onSubmit={handleSubmit}>
              <div className="formulario-inputs">
                <input type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} required />
                <input type="text" name="evento" placeholder="Descrição" value={formData.evento} onChange={(e) => setFormData({ ...formData, evento: e.target.value })} required />
                <input type="date" name="data" value={formData.data} onChange={(e) => setFormData({ ...formData, data: e.target.value })} required />
                <input type="time" name="horario" value={formData.horario} onChange={(e) => setFormData({ ...formData, horario: e.target.value })} required />
                <button className="adicionar-infos" type="submit"><strong>Adicionar Evento</strong></button>
              </div>
            </form>
          </div>
        </div>
      )}

      <NavbarProfessores />


    </div>
  )
}




