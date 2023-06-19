import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import userDetails from './userData'
import postDetails from './posts'

export const store = configureStore({
    reducer: {
        authentication: authSlice,
        userData:userDetails,
        posts:postDetails,
    }
})

