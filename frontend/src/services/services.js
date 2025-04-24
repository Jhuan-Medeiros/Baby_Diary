import http from "./api"

//calendario
export async function getCalendario() {
    const response = await http.get('/calendario');
    return response.data;
}

export async function getCalendarioByDate(data) {
    const response = await http.get(`calendario/data/${data}`);
    return response.data;
} // pega por data

export async function createCalendario(data, titulo, evento, horario) {
  const response = await http.post('/calendario', { data, titulo, evento, horario });
  return response.data;
} // cria evento

export async function deleteCalendario(data) {
    const response = await http.delete(`/calendario/${data}`);
    return response.data;
} // deleta evento