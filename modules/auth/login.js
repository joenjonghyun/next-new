import {createAction, handleActions} from 'redux-actions';
import {call, delay, put, takeLatest, select, throttle} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'

const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}
export const initialState = {
    loginUser: null,
    loginError: null,
    isLoggined: false,
    token: ''
}

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGIN_CANCELLED = 'auth/LOGIN_CANCELLED';
const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';
const SAVE_TOKEN = 'auth/SAVE_TOKEN';
const DELETE_TOKEN = 'auth/DELETE_TOKEN';

export const loginRequest = createAction(LOGIN_REQUEST, data => data)
export const logoutRequest = createAction(LOGOUT_REQUEST, data => data)
export const loginCancelled = createAction(LOGIN_CANCELLED, data => data)

export function* loginSaga() {
    yield takeLatest(LOGIN_REQUEST, signin);
    yield takeLatest(LOGIN_CANCELLED, loginCancelledService);
    yield takeLatest(LOGOUT_REQUEST, logoutService);

    
}
function* signin(action) {
    try {
        console.log(" **** 여기가 핵심 *** " + JSON.stringify(action))
        const response = yield call(loginAPI, action.payload)
        console.log(" 로그인 서버다녀옴: " + JSON.stringify(response.data))
        const result = response.data
        yield put({type: LOGIN_SUCCESS, payload: result})
        yield put({type: SAVE_TOKEN, payload: result})
    } catch (error) {
        yield put({type: LOGIN_FAILURE, payload: error.message})
    }
}

function* loginCancelledService(action) {
    try {
        yield put(window.location.href="/")
    } catch (error) {
        
    }
}
function* logoutService(action) {
    try {
        yield put(window.location.href="/")
    } catch (error) {
        
    }
}

const loginAPI = payload => axios.post(
    `${SERVER}/user/login`,
    payload,
    {headers}
)

const login = handleActions({
    [HYDRATE]: (state, action) => ({
        ...state,
        ...action.payload
        
    }),
    [LOGIN_SUCCESS]: (state, action) => ({
        ...state,
        loginUser: action.payload,
        isLoggined: true,
    }),
    [LOGIN_FAILURE]: (state, action) => ({
        ...state,
        loginError: null,
    }),
    [SAVE_TOKEN]: (state, action) => ({
        ...state,
        token: ''

    }),
    [DELETE_TOKEN]: (state, action) => ({
        ...state,
        token: ''
    })
}, initialState)

export default login