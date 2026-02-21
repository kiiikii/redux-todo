import { PlusCircle } from 'lucide-react'
import React from 'react'

export default function Button({onClick, disabled}) {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    className='flex items-center justify-center gap-2 bg-blue-dark hover:bg-blue text-gray-100 font-bold p-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
    >
      Tambah
      <PlusCircle size={16}/>
    </button>
  )
}
