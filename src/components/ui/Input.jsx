import React from "react";

export default function Input({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Tambah Tugas Baru"}
      className="flex-1 p-4 rounded-lg border transition-all outline-none bg-white text-gray-700 border-gray-300 placeholder:text-gray-400 focus:border-purple dark:bg-gray-500 dark:text-gray-100 dark:border-gray-700 dark:placeholder:text-gray-300 dark:focus:border-purple-dark"
    />
  );
}
