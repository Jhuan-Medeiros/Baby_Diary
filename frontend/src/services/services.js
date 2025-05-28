import api from "../services/api";

//calendario
export async function getCalendario() {
    const response = await api.get('/calendario');
    return response.data;
}

export async function getCalendarioByDate(data) {
    const response = await api.get(`calendario/data/${data}`);
    return response.data;
} // pega por data

export async function createCalendario(data, titulo, evento, horario) {
    const response = await api.post('/calendario', { data, titulo, evento, horario });
    return response.data;
} // cria evento

//NEW

export async function deleteCalendario(id_calendario) {
    const response = await api.delete(`/calendario/${id_calendario}`);
    return response.data;
}

export async function updateCalendario(id_calendario, data, titulo, evento, horario) {
    const response = await api.put(`/calendario/${id_calendario}`, { data, titulo, evento, horario });
    return response.data;
}

//rotina
export async function createRotina(data) {
    const response = await api.post('/rotina', data);
    return response.data;
}

//usuarios
export async function getUsuarios() {
    const response = await api.get('/usuarios');
    return response.data;
}
