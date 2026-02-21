import { Trash2 } from 'lucide-react'
import React from 'react'

export default function Delete({onClick}) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-gray-50 p-2 text-gray-300 hover:text-danger dark:hover:bg-gray-400 rounded-md transition-all group"
    >
      <Trash2 size={20} />
    </button>
  )
}
