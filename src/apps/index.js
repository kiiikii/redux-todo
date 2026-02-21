import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice'

//* untuk di store ini kita konfigurasi dulu untuk reducernya yang mengambil di dalam Slicenya
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  }
})