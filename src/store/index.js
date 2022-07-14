import { configureStore } from '@reduxjs/toolkit'
import userLinkedListSlice from './userLinkedList-slice'


const store = configureStore({
  reducer:{
    userLinkedList: userLinkedListSlice.reducer,
  }
})

export default store