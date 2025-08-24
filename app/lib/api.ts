import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.rawg.io/api',
    method: 'GET',
    headers: {
        accept: "application/json",
    }
})

const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function fetchGames(page: number = 1, pageSize: string = '20', params: string = '', developer: string = '', publisher: string = '', platforms: string = '', tags: string = '') {
    
    try {
        const response = await api.get(`/games?key=${apiKey}&page=${page}&page_size=${pageSize}${!!params ? `&ordering=${params}` : ''}${!!developer ? `&developers=${developer}` : ''}${!!publisher ? `&publishers=${publisher}` : ''}${!!platforms ? `&platforms=${platforms}` : ''}${!!tags ? `&tags=${tags}` : ''}`)
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

export async function fetchDevelopes(page: number = 1, pageSize: string = '20') {   
    try {
        const response = await api.get(`/developers?key=${apiKey}&page=${page}&page_size=${pageSize}`)
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

export async function fetchPublishers(page: number = 1, pageSize: string = '20') {   
    try {
        const response = await api.get(`/publishers?key=${apiKey}&page=${page}&page_size=${pageSize}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function fetchPublisherBySlug(slug: string) {
    try {
        const response = await api.get(`/publishers/${slug}?key=${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function fetchPlatforms() {   
    try {
        const response = await api.get(`/platforms?key=${apiKey}`)
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

export async function fetchScreenshots(id: string) {
    try {
        const response = await api.get(`/games/${id}/screenshots?key=${apiKey}`)       
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function fetchGameReviews(slug: string) {
    try {
        const response = await api.get(`/games/${slug}/reviews?key=${apiKey}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}