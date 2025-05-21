import React, { useEffect, useState } from 'react';
import { updateCalendario, deleteCalendario, getCalendarioByDate, createCalendario, getCalendario } from '../../services/services.js';
import '../Home/Home.css';

function calcularPascoa(ano) {
  const f = Math.floor;
  const G = ano % 19;
  const C = f(ano / 100);
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  const J = (ano + f(ano / 4) + I + 2 - C + f(C / 4)) % 7;
  const L = I - J;
  const mes = 3 + f((L + 40) / 44);
  const dia = L + 28 - 31 * f(mes / 4);
  return new Date(ano, mes - 1, dia);
}

function formatarData(date) {
  return date.toISOString().split('T')[0];
}

function calcularFeriadosNacionais(ano) {
  const feriados = [];

  // Feriados fixos
  feriados.push(`${ano}-01-01`);
  feriados.push(`${ano}-04-21`);
  feriados.push(`${ano}-05-01`);
  feriados.push(`${ano}-09-07`);
  feriados.push(`${ano}-10-12`);
  feriados.push(`${ano}-11-02`);
  feriados.push(`${ano}-11-15`);
  feriados.push(`${ano}-12-25`);


  // Feriados móveis
  const pascoa = calcularPascoa(ano);

  const carnaval = new Date(pascoa);
  carnaval.setDate(pascoa.getDate() - 47);
  feriados.push(formatarData(carnaval));

  const sextaSanta = new Date(pascoa);
  sextaSanta.setDate(pascoa.getDate() - 2);
  feriados.push(formatarData(sextaSanta));

  const corpusChristi = new Date(pascoa);
  corpusChristi.setDate(pascoa.getDate() + 60);
  feriados.push(formatarData(corpusChristi));

  return feriados;
}


export const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({ data: '', titulo: '', evento: '', horario: '' });
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  //NEW
  const [modalTodosEventosAberto, setModalTodosEventosAberto] = useState(false);
  const [todosEventos, setTodosEventos] = useState([]);
  const [feriadosDoMes, setFeriadosDoMes] = useState([]);
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false);
  const [eventoParaDeletar, setEventoParaDeletar] = useState(null);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [eventoEditando, setEventoEditando] = useState(null);



  useEffect(() => {
    const ano = currentDate.getFullYear();
    const feriados = calcularFeriadosNacionais(ano);
    setFeriadosDoMes(feriados);
  }, [currentDate]);

  const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

  const carregarEventos = async (data) => {
    try {
      const eventosData = await getCalendarioByDate(data);
      setEventos(eventosData);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  //NEW
  const carregarTodosEventos = async () => {
    try {
      const eventos = await getCalendario();
      setTodosEventos(eventos);
    } catch (error) {
      console.error("Erro ao buscar todos os eventos:", error);
    }
  };


  const handleDateClick = (day) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dataSelecionada = new Date(year, month, day).toISOString().split('T')[0]; //formato YYYY-MM-DD
    setSelectedDate(dataSelecionada);
    setFormData(prev => ({ ...prev, data: dataSelecionada }));
    carregarEventos(dataSelecionada);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ano = new Date(formData.data).getFullYear();
    const feriados = calcularFeriadosNacionais(ano);

    if (feriados.includes(formData.data)) {
      setMensagem({ tipo: 'erro', texto: 'Não é possível adicionar eventos em feriados.' });
      setTimeout(() => setMensagem(null), 3000);
      return;
    }

    try {
      await createCalendario(formData.data, formData.titulo, formData.evento, formData.horario);
      setMensagem({ tipo: 'sucesso', texto: 'Evento adicionado com sucesso!' });
      setModalAberto(false);
      setEventoEditando(false);
      carregarEventos(formData.data);
      setFormData({ data: '', titulo: '', evento: '', horario: '' });
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao adicionar o evento. Tente novamente.' });
    }

    setTimeout(() => setMensagem(null), 3000);
  };

  //NEW

  const confirmarDeleteEvento = async () => {
    try {
      await deleteCalendario(eventoParaDeletar);
      setMensagem({ tipo: 'sucesso', texto: 'Evento deletado com sucesso!' });
      carregarTodosEventos();
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      setMensagem({ tipo: 'erro', texto: 'Erro ao deletar o evento.' });
    } finally {
      setEventoParaDeletar(null);
      setModalConfirmacaoAberto(false);
      setTimeout(() => setMensagem(null), 3000);
    }
  };


  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    const startDay = (firstDay.getDay() + 6) % 7; // ajuste para começar na segunda
    const daysArray = [];

    const prevLastDay = new Date(year, month, 0).getDate(); // ultimo dia do mês anterior

    const feriados = calcularFeriadosNacionais(year);


    // dias do mês anterior
    for (let i = startDay - 1; i >= 0; i--) {
      daysArray.push(
        <div key={`prev-${i}`} className="date other-month">
          {prevLastDay - i}
        </div>
      );
    }



    // dias do mês atual
    for (let i = 1; i <= totalDays; i++) {
      const dataCompleta = new Date(year, month, i).toISOString().split('T')[0];
      const isToday = new Date().toDateString() === new Date(year, month, i).toDateString();
      const isFeriado = feriados.includes(dataCompleta);

      daysArray.push(
        <button
          key={`curr-${i}`}
          className={`date ${isToday ? 'active2' : ''} ${isFeriado ? 'feriado' : ''}`}
          onClick={() => handleDateClick(i)}
          title={isFeriado ? 'Feriado' : ''}
        >
          {i}
        </button>
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

      {/* sessão de avisos fixos */}
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

      {/* chat fixo com professor */}
      <div className="chat-inicial">
        <div className="alinhamento-chat">
          <img src="src/assets/img/perfil-chat.png" alt="perfil-chat" id="perfil-chat" />
          <div className="letras-coluna2">
            <h2>Professor Cururu</h2>
            <p id="info-chat">Filho com problema intestinal</p>
          </div>
        </div>
      </div>

      {/* acesso à rotina */}
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
              {eventos.length === 0 && !feriadosDoMes.includes(selectedDate) ? (
                <p>Sem eventos nesta data.</p>
              ) : (
                <>
                  {feriadosDoMes.includes(selectedDate) && (
                    <div className="evento">
                      <p>Feriado Nacional</p>
                    </div>
                  )}
                  {eventos.map((ev, i) => (
                    <div key={i} className="evento">
                      <p><strong>{ev.titulo}</strong> - {ev.evento} às {ev.horario}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="botoes-eventos">
        <button className="btn-abrir-form" onClick={() => setModalAberto(true)}>
          <strong>Novo Evento</strong>
        </button>

        <button className="btn-abrir-form" onClick={() => {
          carregarTodosEventos();
          setModalTodosEventosAberto(true);
        }}>
          <strong>Deletar Eventos</strong>
        </button>
      </div>


      {mensagem && (
        <div className={`toast ${mensagem.tipo === 'erro' ? 'erro' : ''}`}>
          {mensagem.texto}
        </div>
      )}


      {/* modal para novo evento */}
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

      {modalTodosEventosAberto && (
        <div className="modal-overlay">
          <div className="modal-conteudo">
            <button className="btn-fechar" onClick={() => setModalTodosEventosAberto(false)}>×</button>
            <h2>Todos os Eventos</h2>
            {todosEventos.length === 0 ? (
              <p>Não há eventos cadastrados.</p>
            ) : (
              todosEventos.map((ev) => (
                <div key={ev.id_calendario} className="evento" >
                  <p>
                    <strong>{ev.titulo}</strong> - {ev.evento} <br />
                    Data: {ev.data} às {ev.horario}
                  </p>
                  <div className="btns">
                    <button
                      className="btn-excluir"
                      onClick={() => {
                        setEventoParaDeletar(ev.id_calendario);
                        setModalConfirmacaoAberto(true);
                      }}
                    >
                      ✖
                    </button>
                    <button
                      className="btn-editar"
                      onClick={() => {
                        setEventoEditando(ev);
                        setFormData({
                          data: ev.data,
                          titulo: ev.titulo,
                          evento: ev.evento,
                          horario: ev.horario,
                        });
                        setModalEditarAberto(true);
                      }}
                    >
                      ✎
                    </button>
                  </div>


                </div>
              ))
            )}
          </div>
        </div>
      )}

      {modalConfirmacaoAberto && (
        <div className="modal-overlay">
          <div className="modal-conteudo confirmacao">
            <p>Tem certeza que deseja excluir este evento?</p>
            <div className="botoes-confirmacao">
              <button className="btn-cancelar" onClick={() => setModalConfirmacaoAberto(false)}>Cancelar</button>
              <button className="btn-confirmar" onClick={confirmarDeleteEvento}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {modalEditarAberto && (
        <div className="modal-overlay">
          <div className="modal-conteudo">
            <button className="btn-fechar" onClick={() => setModalEditarAberto(false)}>×</button>
            <h2>Editar Evento</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await updateCalendario(
                  eventoEditando.id_calendario,
                  formData.data,
                  formData.titulo,
                  formData.evento,
                  formData.horario
                );
                setMensagem({ tipo: 'sucesso', texto: 'Evento atualizado com sucesso!' });
                setModalEditarAberto(false);
                carregarTodosEventos();
                if (selectedDate === formData.data) carregarEventos(selectedDate);
              } catch (error) {
                console.error("Erro ao editar evento:", error);
                setMensagem({ tipo: 'erro', texto: 'Erro ao editar evento.' });
              }
              setTimeout(() => setMensagem(null), 1000);
            }}>
              <div className="formulario-inputs">
                <input type="text" name="titulo" placeholder="Título" value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} required />
                <input type="text" name="evento" placeholder="Descrição" value={formData.evento} onChange={(e) => setFormData({ ...formData, evento: e.target.value })} required />
                <input type="date" name="data" value={formData.data} onChange={(e) => setFormData({ ...formData, data: e.target.value })} required />
                <input type="time" name="horario" value={formData.horario} onChange={(e) => setFormData({ ...formData, horario: e.target.value })} required />
                <button className="adicionar-infos" type="submit"><strong>Salvar Alterações</strong></button>
              </div>
            </form>
          </div>
        </div>
      )}




    </div>
  )
}
