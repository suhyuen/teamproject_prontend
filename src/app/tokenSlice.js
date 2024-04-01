import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: ""
    },
    reducers: {
        token: (state, actions) => {
            state.value = actions.payload
        }
    }
})

export const { token } = tokenSlice.actions
export default tokenSlice