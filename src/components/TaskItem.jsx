import React from "react";
import Checkbox from "./ui/Checkbox";
import Delete from "./ui/Delete";

export default function TaskItem({ todo, onToggle, onDelete }) {
  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-lg transition-all 
      ${
        todo.completed
          ? "bg-gray-200 border-gray-200 dark:bg-gray-500 dark:border-gray-500"
          : "bg-white border-gray-300 dark:bg-gray-500 dark:border-gray-400 hover:border-blue dark:hover:border-gray-300"
      }`}
    >
      <div className="mt-1">
        <Checkbox checked={todo.completed} onClick={() => onToggle(todo)} />
      </div>

      <p
        className={`flex-1 text-sm leading-relaxed transition-all ${
          todo.completed
            ? "text-gray-300 dark:text-gray-300 line-through"
            : "text-gray-600 dark:text-gray-100"
        }`}
      >
        {todo.title}
      </p>

      <Delete onClick={() => onDelete(todo.id)} />
    </div>
  );
}
