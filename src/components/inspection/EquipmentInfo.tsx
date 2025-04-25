'use client'

import React from 'react'

interface EquipmentInfoProps {
  buildNumber: string
  serialNumber: string
  model: string
  bay: string
}

const EquipmentInfo: React.FC<EquipmentInfoProps> = ({ buildNumber, serialNumber, model, bay }) => {
  return (
    <div className='bg-black text-white py-1.5 px-2 md:px-4 flex flex-col md:flex-row md:justify-between md:items-center sm:text-sm md:text-5xl h-auto md:h-7 mb-3'>
      <div className='flex flex-wrap items-center space-x-2 md:space-x-4 mb-1 md:mb-0'>
        <div className='whitespace-nowrap'>
          <span className='text-gray-400 mr-1 font-bold'>BUILD:</span>
          <span className='text-yellow-500 font-bold'>{buildNumber}</span>
        </div>
        <div className='whitespace-nowrap'>
          <span className='text-gray-400 mr-1 font-bold'>SERIAL:</span>
          <span className='text-yellow-500 font-bold'>{serialNumber}</span>
        </div>
        <div className='whitespace-nowrap'>
          <span className='text-gray-400 mr-1 font-bold'>MODEL:</span>
          <span className='text-yellow-500 font-bold'>{model}</span>
        </div>
      </div>
      <div className='whitespace-nowrap'>
        <span className='text-gray-400 mr-1 font-bold'>BAY:</span>
        <span className='text-yellow-500 font-bold'>{bay}</span>
      </div>
    </div>
  )
}

export default EquipmentInfo
