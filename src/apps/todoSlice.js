import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as todoApi from '../apis/todo.api';


//* initialState ini akan kita gunakan di dalam slicingnya yang dimana berisikan items dalam bentuk array kemudian loading dan errornya
const initialState = {
  items: [],
  loading: false,
  error: null
}

//* di file ini akan menjadi otak untuk middlewarenya menggunakan RTK async (redux-thunk)
//* kita lakukan fetching data dengan memanggil api yang sudah kita buat sebelumnya
export const getTodo = createAsyncThunk('todos/fetchAll', async (_, {rejectedWithValue}) => {
  try {
    const response = await todoApi.getTodo()
    
    //* return ini mengembalikan array dari JSONPlaceholder
    return response.data
  } catch (err) {
    return rejectedWithValue(err.response?.data || "Gagal mengambil data")
  }
})

//* ini untuk melakukan action tambah todo
//* async disini memiliki 2 parameter yaitu newTodo yang nantinya akan dipanggil ke dalam createTodo dan reject sebagai errornya
export const addTodo = createAsyncThunk('todos/add', async (newTodo, {rejectedWithValue}) => {
  try {
    const response = await todoApi.createTodo(newTodo)
    return response.data
  } catch {
    return rejectedWithValue("Gagal menambah data")
  }
})

//* disini untuk melakukan hapus todo
export const deleteTodo = createAsyncThunk('todos/remove', async (id, {rejectedWithValue}) => {
  //* untuk delete sendiri langsung kita panggil api untuk deletenya yang dimana id sebagai parameternya
  try {
    await todoApi.deleteTodo(id)
    return id
  } catch {
    return rejectedWithValue("Gagal menghapus todo")
  }
})

//* ini untuk melakukan update todo yang sudah selesai atau belum
export const toggleTodo = createAsyncThunk('todos/toggle', async (todo, {rejectedWithValue}) => {
  try {
    //* kita gunakan spread operator untuk membuka semua todo yang ada di list karna nantinya untuk melakukan itu butuh datanya dari list tersebut
    const updateTodo = {...todo, completed: !todo.completed}
    const response = await todoApi.updateTodo(updateTodo)
    return response.data
  } catch {
    return rejectedWithValue("Gagal memperbaharui status")
  }
})

//* kemudian setelah kita membuat async untuk beberapa action barulah kita melakukan slice terhadap action tersebut
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {}, //* disini kita akan gunakan extraReducers untuk thunknya
  extraReducers: (builder) => {
    builder
    //* untuk fetching semua data
    .addCase(getTodo.pending, (state) => {
      state.loading = true
    }).addCase(getTodo.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload
    }).addCase(getTodo.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    //* disini untuk tambah todo
    .addCase(addTodo.fulfilled, (state, action) => {
      //* kita langsung taruh data yang sudah dibuat tadi di awal agar langsung terlihat
      state.items.unshift(action.payload)
    })

    //* untuk menghapus todonya
    .addCase(deleteTodo.fulfilled, (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    })

    //* ini untuk statusnya sudah selesai apa belum
    .addCase(toggleTodo.fulfilled, (state, action) => {
      //* kita inisiasi index dulu karna untuk melakukan update dibutuhkan index keberapa yang ingin dilakukan update
      const index = state.items.findIndex(item => item.id === action.payload.id)

      //* kita berikan if kalau index bukan -1 nantinya action.payload akan bekerja melakukan update selesaai apa belum selesai
      if( index !== -1) {
        state.items[index] = action.payload
      }
    })
  }
})

export default todoSlice.reducer