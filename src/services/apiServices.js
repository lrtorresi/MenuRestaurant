import axios from 'axios';

//função para retornar a URL da API
export const getApiUrl = () => {
    return "http://apirestaurante-001-site1.itempurl.com"
}


//fun~ção para retornar os dados do restaurante
export const getDadosRestaurante = () => {
    return axios.get(getApiUrl() + '/api/restaurante')
        .then(response => {
            return response.data;
        })
}

//fun~ção para retornar os produtos
export const getDadosCardapio = () =>{
    return axios.get(getApiUrl() + '/api/cardapio')
    .then(response =>{
        return response.data;
    })
}
