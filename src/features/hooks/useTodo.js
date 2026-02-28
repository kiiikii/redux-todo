import React from "react";
import { useEffect, useCallback, useMemo } from "react";
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
  //* lalu kita optimasi menggunakan useMemo supaya tidak dihitung ulang jika itemnyatidak berubah
  const total = useMemo(() => items.length, [items]);
  const completed = useMemo(
    () => items.filter((t) => t.completed).length,
    [items],
  );

  //* disini kita menggunakan useCallback supaya referensi fungsinya dari add stabil
  const add = useCallback(
    (title) => {
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
    [dispatch],
  );

  //* dan disini useCallbacknya digunakan di remove supaya TaskItem tidak re-render sia-sia
  const remove = useCallback(
    (id) => {
      //* konfirmasi jika ingin mengahapus tugas (karna terkadang kita tidak sengaja klik hapus jadi bisa dilakukan pencegahan dengan menambah konfirmasi)
      if (window.confirm("Apakah ingin menghapus tugas tersebut ?")) {
        dispatch(deleteTodo(id));
      }
    },
    [dispatch],
  );

  //* disini untuk useCallback digunakan untuk toggle supaya TaskItem tidak re-render sia-sia
  const toggle = useCallback((todo) => {
    //* disini hanya mengambil proses dari thunknya
    dispatch(toggleTodo(todo));
  }, [dispatch]);

  return {
    todos: items,
    loading,
    error,
    total,
    completed,
    add,
    remove,
    toggle,
  };
};
