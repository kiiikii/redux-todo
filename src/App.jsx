import { useState } from 'react';
import './App.css'
import { useTodo } from './features/hooks/useTodo'
import Layout from './components/Layout';
import Input from './components/ui/Input';
import Button from './components/ui/Button';
import Stats from './components/ui/Stats';
import EmptyState from './components/ui/EmptyState';
import TaskItem from './components/TaskItem';
import { useTheme } from './libs/ThemeContext';

function App() {

  //* ini kita mengambil inisiasi yang ada di hook useTodo yang sudah kita buat sebelumnya
  const {todos, total, completed, add, remove, toggle, loading} = useTodo();

  //* disini untuk lakukan toggle theme yang diambil dari state tema
  const {theme, toggleTheme} = useTheme();

  //* disini kita inisiasi juga untuk inputan usernya
  const [text, setText] = useState("")

  //* lalu untuk yang disini akan menghandle setelah klik submit
  //* dan e.preventDefault() ini untuk mencegah page loading ketika setelai input
  //* lalu nanti juga jika sudah menambah tugas input akan reset
  const handleAdd = (e) => {
    e.preventDefault()
    add(text)
    setText("")
  }

  return (
    <Layout>
      <div className="absolute top-5 right-5">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-400 text-gray-100 text-xs font-bold uppercase"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <form onSubmit={handleAdd} className='flex gap-2'>
        <Input 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button disabled={!text.trim()} />
      </form>

      <Stats total={total} completed={completed} />

      <div className="flex flex-col gap-3 pb-20">
        {loading ? (
          <p className="text-center text-gray-300 py-10">Memuat data...</p>
        ) : todos.length === 0 ? (
          <EmptyState />
        ) : (
          todos.map((todo) => (
            <TaskItem 
              key={todo.id}
              todo={todo}
              onToggle={toggle}
              onDelete={remove}
            />
          ))
        )}
      </div>
    </Layout>
  )
}

export default App
