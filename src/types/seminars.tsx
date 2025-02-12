export enum SeminarsTypes {
    FETCH_SEMINARS = 'FETCH_REPOSITORIES',
    FETCH_SEMINARS_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS',
    FETCH_SEMINARS_ERROR = 'FETCH_REPOSITORIES_ERROR',
}

export interface Seminar {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
}

export interface SeminarsState {
    seminars: Seminar[];
    loading: boolean;
    error: string;
}

export type SeminarAction = {
    type: SeminarsTypes.FETCH_SEMINARS
} | {
    type: SeminarsTypes.FETCH_SEMINARS_SUCCESS,
    payload: Seminar[]
} | {
    type: SeminarsTypes.FETCH_SEMINARS_ERROR,
    payload: string
}