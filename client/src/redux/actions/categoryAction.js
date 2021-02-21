import { START_LOADING, STOP_LOADING, SHOW_SUCCESS_MESSAGE, SHOW_ERRORR_MESSAGE } from '../types/loadingTypes'
import { GET_CATEGORIES } from '../types/categoryTypes'
import axios from 'axios'
export const getCategories = () => async dispatch => {
    try {
        dispatch({
            type: START_LOADING
        })
        const response = await axios.get('/api/category')
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: GET_CATEGORIES, payload: response.data.categories
        })


    } catch (error) {
        dispatch({
            type: STOP_LOADING
        })
        dispatch({
            type: SHOW_ERRORR_MESSAGE, payload: error.response.data.errorrMessage
        })
    }
}