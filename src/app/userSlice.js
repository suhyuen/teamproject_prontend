import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userId',
    initialState: {
        value: ""
    },
    reducers: {
        userId: (state, actions) => {
            state.value = actions.payload
        }
    }
})

export const { userId } = userSlice.actions
export default userSlice