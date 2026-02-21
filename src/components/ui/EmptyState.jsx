import { ClipboardList } from 'lucide-react'
import React from 'react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 border-t border-gray-400 rounded-lg text-gray-300">
      <ClipboardList size={56} className="mb-4 opacity-50" />
      <p className="font-bold text-gray-300">Belum ada tugas untuk saat ini</p>
      <p className='text-sm'>Silahkan tambah tugas pada form diatas</p>
    </div>
  )
}
