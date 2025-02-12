import { Dispatch } from "redux";
import axios from 'axios'
// import { RepositoryAction, RepositoryType } from "../../types/repositoryTypes";
import { SeminarAction, SeminarsTypes } from "../../types/seminars";

// api ссылка
const API_URL = 'http://localhost:3002'

// axios для запроса
const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})


// получение репозиториев
export const fetchGetSeminar = () => async (dispatch: Dispatch<SeminarAction>) => {
try {
    dispatch({
        type: SeminarsTypes.FETCH_SEMINARS,
    })
    const response = await API.get('/seminars')
    dispatch({
        type: SeminarsTypes.FETCH_SEMINARS_SUCCESS,
        payload: response.data
    })
} catch (e) {
    dispatch({
        type: SeminarsTypes.FETCH_SEMINARS_ERROR,
        payload: 'Произошла ошибка при загрузке семинаров'
    })
}
}

// удаление репозитория
export const fetchDeleteSeminar = (id: number) => async (dispatch: Dispatch<SeminarAction>) => {
    try {
        dispatch({
            type: SeminarsTypes.FETCH_SEMINARS,
        })
        const response = await API.delete(`/seminars/${id}`)
        dispatch({
            type: SeminarsTypes.FETCH_SEMINARS_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: SeminarsTypes.FETCH_SEMINARS_ERROR,
            payload: 'Произошла ошибка при загрузке семинаров'
        })
    }
}

// редактирование репозитория
export const fetchUpdateSeminar = (id: number, title: string, description: string, date: string, time: string, photo: string) => async (dispatch: Dispatch<SeminarAction>) => {
    try {
        dispatch({
            type: SeminarsTypes.FETCH_SEMINARS,
        })
        const response = await API.put(`/seminars/${id}`, {title, description, date, time, photo})
        dispatch({
            type: SeminarsTypes.FETCH_SEMINARS_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: SeminarsTypes.FETCH_SEMINARS_ERROR,
            payload: 'Произошла ошибка при загрузке семинаров'
        })
    }
}

// добавление репозитория
export const fetchAddSeminar = (title: string, description: string, date: string, time: string, photo: string) => async (dispatch: Dispatch<SeminarAction>) => {
    try {
        dispatch({
            type: SeminarsTypes.FETCH_SEMINARS,
        })
        const response = await API.post('/seminars', {title, description, date, time, photo})
        dispatch({
            type: SeminarsTypes.FETCH_SEMINARS_SUCCESS,
            payload: response.data
        })
    } catch (e) {
        dispatch({
            type: SeminarsTypes.FETCH_SEMINARS_ERROR,
            payload: 'Произошла ошибка при загрузке семинаров'
        })
    }
}


