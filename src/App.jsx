import { useState } from "react";
import "./App.css";
import { useTodo } from "./features/hooks/useTodo";
import Layout from "./components/Layout";
import Input from "./components/ui/Input";
import Button from "./components/ui/Button";
import Stats from "./components/ui/Stats";
import TaskItem from "./components/TaskItem";
import { useTheme } from "./libs/ThemeContext";
import { useCallback } from "react";
import { lazy } from "react";
import { Suspense } from "react";

function App() {
  //* ini kita mengambil inisiasi yang ada di hook useTodo yang sudah kita buat sebelumnya
  const { todos, total, completed, add, remove, toggle, loading } = useTodo();

  //* disini kita bisa mengimplementasikan lazy loading di empty state karna state ini hanya terender ketika data kosong saja
  const EmptyState = lazy(() => import("./components/ui/EmptyState"));

  //* disini untuk lakukan toggle theme yang diambil dari state tema
  const { theme, toggleTheme } = useTheme();

  //* disini kita inisiasi juga untuk inputan usernya
  const [text, setText] = useState("");

  //* lalu untuk yang disini akan menghandle setelah klik submit
  //* dan e.preventDefault() ini untuk mencegah page loading ketika setelai input
  //* lalu nanti juga jika sudah menambah tugas input akan reset
  //* kita kita optimasi dengan menggunakan useCallback
  const handleAdd = useCallback(
    (e) => {
      e.preventDefault();
      if (text.trim()) {
        add(text);
        setText("");
      }
    },
    [add, text],
  );

  return (
    <Layout>
      <div className="absolute top-5 right-5">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-400 text-gray-100 text-xs font-bold uppercase"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <Input value={text} onChange={(e) => setText(e.target.value)} />
        <Button disabled={!text.trim()} />
      </form>

      <Stats total={total} completed={completed} />

      <div className="flex flex-col gap-3 pb-20">
        {loading ? (
          <p className="text-center text-gray-300 py-10">Memuat data...</p>
        ) : todos.length === 0 ? (
          //* disini kita bungkus untuk komponen si lazy-nya menggunakan suspense
          <Suspense fallback={<div className="animate-pulse h-40 bg-gray-500/10 rounded-lg" />}>
            <EmptyState />
          </Suspense>
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
  );
}

export default App;
