import { Check } from 'lucide-react'
import React from 'react'

export default function Checkbox({checked, onClick}) {
  return (
    <button
      onClick={onClick}
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
        ${checked 
          ? "bg-purple-dark border-purple-dark hover:bg-purple hover:border-purple" 
          : "border-blue hover:border-blue-dark hover:bg-blue/10"
        }`}
    >
      {checked && <Check size={12} strokeWidth={4} className='text-gray-100'/>}
    </button>
  )
}
