import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    posts:[]
}

const postDetails = createSlice({
    name: 'postDetails',
    initialState: INITIAL_STATE,
    reducers: {
        getAllPost:(state, action) => {
                state.posts = action.payload
        },
    },
})

export const { getAllPost } = postDetails.actions

export default postDetails.reducer