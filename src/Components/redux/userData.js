import { createSlice } from '@reduxjs/toolkit'

const token = Boolean(localStorage.getItem('token'))

// Retrieve the user details from localStorage
const user = Boolean(JSON.parse(localStorage.getItem('user')))


let status = token && user

const INITIAL_STATE = {
    isAuth: status,
    userData:{}
}

const userDetails = createSlice({
    name: 'userData',
    initialState: INITIAL_STATE,
    reducers: {
        userDetailsReducer:(state, action) => {
                state.userData = action.payload
        },
    },
})

export const { userDetailsReducer } = userDetails.actions

export default userDetails.reducer