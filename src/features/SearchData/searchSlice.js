    import { createSlice } from '@reduxjs/toolkit'

    export const searchSlice = createSlice({
    name: 'searchData',
    initialState: {
        value: [],
    },
    reducers: {
        savedata: (state,action) => {        
        state.value = action.payload
        },
        decrement: (state) => {
        state.value -= 1
        },
        incrementByAmount: (state, action) => {
        state.value += action.payload
        },
    },
    })

    // Action creators are generated for each case reducer function
    export const { savedata, decrement, incrementByAmount } = searchSlice.actions

    export const selectData = (state) => state.searchData.value

    export default searchSlice.reducer