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


//NEW

export async function deleteCalendario(id_calendario) {
    const response = await http.delete(`/calendario/${id_calendario}`);
    return response.data;
}

// export async function updateCalendario(id_calendario, data, titulo, evento, horario) {
//     const response = await http.put(`/calendario/${id_calendario}`, { data, titulo, evento, horario });
//     return response.data;
//   }
  


