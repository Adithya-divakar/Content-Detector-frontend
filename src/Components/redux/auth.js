import { createSlice } from '@reduxjs/toolkit'

const token = Boolean(localStorage.getItem('token'))

// Retrieve the user details from localStorage
const user = Boolean(JSON.parse(localStorage.getItem('user')))

let status = token && user


const INITIAL_STATE = {
    isAuth: status
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        isAuthorised: (state, action) => {
            state.isAuth = action.payload
        },
    },
})

export const { isAuthorised } = authSlice.actions

export default authSlice.reducer