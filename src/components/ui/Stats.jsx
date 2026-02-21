import React from 'react'

export default function Stats({total, completed}) {
  return (
    <div className="flex justify-between items-end mb-6 mt-16">
      <div className="flex gap-2 items-center">
        <p className="text-blue font-bold text-sm">Belum Selesai</p>
        <span className="bg-blue text-white font-bold dark:bg-gray-400 dark:text-gray-100 px-2 py-0.5 rounded-full text-xs">
          {total}
        </span>
      </div>

      <div className="flex gap-2 items-center">
        <p className="text-purple font-bold text-sm">Selesai</p>
        <span className="bg-purple text-white dark:bg-gray-400 dark:text-gray-100 px-2 py-0.5 rounded-full text-xs font-bold">
          {total === 0 ? 0 : `${completed} dari ${total}`}
        </span>
      </div>
    </div>


  )
}
