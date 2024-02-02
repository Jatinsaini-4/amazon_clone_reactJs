import { configureStore } from '@reduxjs/toolkit'

//import counterReducer from '../features/counter/counterSlice'
import counterReducer from '../src/features/counter/counterSlice'
import searchReducer from '../src/features/SearchData/searchSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    searchData:searchReducer,
  },
})