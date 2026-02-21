import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, getTodo, toggleTodo } from "../../apps/todoSlice";

export const useTodo = () => {
  const dispatch = useDispatch();

  //* disini kita panggil initialStatenya
  const { items, loading, error } = useSelector((state) => state.todos);

  //* disini untuk merender todo yang kita ambil dari apinya
  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  //* disini untuk menghitung data untuk dashboardnya
  const total = items.length;
  const completed = items.filter((t) => t.completed).length;

  return {
    todos: items,
    loading,
    error,
    total,
    completed,
    add: (title) => {
      //* disini kita lakukan validasi dan sanitasinya
      const cleanTitle = title.trim();

      //* disini validasi apakah input kosong atau tidak
      if (cleanTitle.length === 0) {
        alert("Input tidak boleh kosong.");
        return;
      }

      //* disini untuk validasi apakah huruf yang dimasukan kurang dari 3 karakter
      if (cleanTitle.length < 3) {
        alert("Minimal harus memiliki 3 karakter.");
        return;
      }

      //* validasi dengan regex supaya hanya angka, huruf, spasi dan tanda baca dasar saja
      const titleRegex = /^[a-zA-Z0-9\s, .!?()-]+$/;
      if (!titleRegex.test(cleanTitle)) {
        alert("Input Mengandung karakter terlarang");
        return;
      }

      //* disini jika lolos dari validasi tersebut akan langsung melakukan action addTodo-nya
      dispatch(
        addTodo({
          title: cleanTitle,
          completed: false,
        }),
      );
    },
    remove: (id) => {
      //* konfirmasi jika ingin mengahapus tugas (karna terkadang kita tidak sengaja klik hapus jadi bisa dilakukan pencegahan dengan menambah konfirmasi)
      if (window.confirm("Apakah ingin menghapus tugas tersebut ?")) {
        dispatch(deleteTodo(id));
      }
    },
    toggle: (todo) => {
      //* disini hanya mengambil proses dari thunknya
      dispatch(toggleTodo(todo));
    },
  };
};
