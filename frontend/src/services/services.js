import http from "./api"

//calendario
export async function getCalendario() {
    const response = await http.get('/calendario');
    return response.data;
}

export async function getCalendarioByDate(data) {
    const response = await http.get(`calendario/data/${data}`);
    return response.data;
}

export async function createCalendario(data, titulo, evento, horario) {
  const response = await http.post('/calendario', { data, titulo, evento, horario });
  return response.data;
}

export async function deleteCalendario(id) {
    const response = await http.delete(`/calendario/${id}`)
}
