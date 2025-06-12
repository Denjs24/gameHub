import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.rawg.io/api',
    method: 'GET',
    headers: {
        accept: "application/json",
    }
})

const apiKey = process.env.RAWG_API_KEY;

export async function fetchGames(page: number = 1, pageSize: string = '20', params: string = '', developer: string = '') {
    console.log(page, pageSize, params, developer);
    
    try {
        const response = await api.get(`/games?key=${apiKey}&page=${page}&page_size=${pageSize}${!!params ? `&ordering=${params}` : ''}${!!developer ? `&developers=${developer}` : ''}`)
        
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function fetchGameBySlug(slug: string) {
    try {
        const response = await api.get(`/games/${slug}?key=${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function fetchDeveloperBySlug(slug: string) {
    try {
        const response = await api.get(`/developers/${slug}?key=${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function searchGames(query: string) {
    try {
        const response = await api.get(`/games?search=${query}&key=${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}