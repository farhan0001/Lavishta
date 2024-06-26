import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, LOAD_USER_SUCCESS, 
    LOAD_USER_REQUEST, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAIL, 
    LOAD_USER_FAIL,
    UPLOAD_PROFILE_REQUEST,
    UPLOAD_PROFILE_SUCCESS,
    UPLOAD_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});
        
        const config = {headers : {"Content-Type" : "application/json"}, withCredentials: true};

        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/api/v1/loginUser`, {email, password}, config);

        dispatch({type: LOGIN_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message});
    }
}

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_REQUEST});

        const config = {headers: {"Content-Type": "multipart/form-data"}, withCredentials: true};
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/api/v1/registerUser`, userData, config);
        dispatch({type: REGISTER_SUCCESS, payload: data.user});

    } catch (error) {
        dispatch({type: REGISTER_FAIL, payload: error.response.data.message});
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});

        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/api/v1/me`, {withCredentials: true});

        dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message});
    }
}

export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${process.env.REACT_APP_BACKEND_URI}/api/v1/logout`, {withCredentials: true});
        dispatch({type: LOGOUT_SUCCESS});
    } catch (error) {
        dispatch({type: LOGOUT_FAIL, payload: error.response.data.message});
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({type: UPLOAD_PROFILE_REQUEST});

        const config = {headers: {"Content-Type": "multipart/form-data"}, withCredentials: true};
        const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_URI}/api/v1/me/update`, userData, config);
        dispatch({type: UPLOAD_PROFILE_SUCCESS, payload: data.success});

    } catch (error) {
        dispatch({type: UPLOAD_PROFILE_FAIL, payload: error.response.data.message});
    }
}

export const updatePassword = (password) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}, withCredentials: true};
        const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_URI}/api/v1/password/update`, password, config);
        dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success});

    } catch (error) {
        dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message});
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST});
        
        const config = {headers : {"Content-Type" : "application/json"}, withCredentials: true};

        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/api/v1/password/forgot`, email, config);

        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
    } catch (error) {
        dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message});
    }
}

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({type: RESET_PASSWORD_REQUEST});
        
        const config = {headers : {"Content-Type" : "application/json"}, withCredentials: true};

        const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_URI}/api/v1/password/reset/${token}`, passwords, config);

        dispatch({type: RESET_PASSWORD_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({type: RESET_PASSWORD_FAIL, payload: error.response.data.message});
    }
}

//Get All Users -- Admin
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({type: ALL_USERS_REQUEST});

        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/api/v1/admin/users`, {withCredentials: true});

        dispatch({type: ALL_USERS_SUCCESS, payload: data.users});
    } catch (error) {
        dispatch({type: ALL_USERS_FAIL, payload: error.response.data.message});
    }
}

//Get User Details -- Admin
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST});

        const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/api/v1/admin/user/${id}`, {withCredentials: true});

        dispatch({type: USER_DETAILS_SUCCESS, payload: data.user});
    } catch (error) {
        dispatch({type: USER_DETAILS_FAIL, payload: error.response.data.message});
    }
}

//Update User -- Admin
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_USER_REQUEST});

        const config = {headers: {"Content-Type": "application/json"}, withCredentials: true};
        const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_URI}/api/v1/admin/user/${id}`, userData, config);
        dispatch({type: UPDATE_USER_SUCCESS, payload: data});

    } catch (error) {
        dispatch({type: UPDATE_USER_FAIL, payload: error.response.data.message});
    }
}

//Delete User -- Admin
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_USER_REQUEST});

        const {data} = await axios.delete(`${process.env.REACT_APP_BACKEND_URI}/api/v1/admin/user/${id}`, {withCredentials: true});
        dispatch({type: DELETE_USER_SUCCESS, payload: data});

    } catch (error) {
        dispatch({type: DELETE_USER_FAIL, payload: error.response.data.message});
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}