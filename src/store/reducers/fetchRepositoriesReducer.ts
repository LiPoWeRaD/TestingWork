import { SeminarsState, SeminarAction, SeminarsTypes } from "../../types/seminars"


// используем для хранения репозиториев
const initialState: SeminarsState = {
    seminars: [],
    loading: false,
    error: '',
}

// reducer
export const fetchRepositoriesReducer = (state = initialState, action: SeminarAction): SeminarsState => {
    switch (action.type) {
        case SeminarsTypes.FETCH_SEMINARS:
            return {
                ...state,
                loading: true
            }
        case SeminarsTypes.FETCH_SEMINARS_SUCCESS:
            return {
                ...state,
                seminars: action.payload,
                loading: false
            }
        case SeminarsTypes.FETCH_SEMINARS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}