'use client'

import React, { ReactNode } from 'react'
// import { useTheme } from "@/context/ThemeContext";

interface GlowingContainerProps {
  children: ReactNode
  title?: string
  className?: string
  headerActions?: ReactNode
}

const GlowingContainer: React.FC<GlowingContainerProps> = ({ children, title, className = '', headerActions }) => {
  // const { theme } = useTheme();
  const isDarkMode = true

  return (
    <div className={`glowing-container relative h-full overflow-hidden rounded-sm ${className}`}>
      <div className='absolute inset-0 z-0 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700'></div>
      <div className='absolute inset-0 z-0 border-2 border-jcb animate-pulse-glow'></div>
      <div className='relative z-10 h-full flex flex-col'>
        {title && (
          <div className='bg-jcb py-1.5 px-2 shadow-md flex items-center justify-between'>
            <div className='flex-1'>
              <h3 className='text-center font-black text-[18px] text-base text-black tracking-wide'>{title}</h3>
            </div>
            {headerActions && <div className='flex items-center ml-2'>{headerActions}</div>}
          </div>
        )}
        <div className='flex-1 p-0 flex items-center justify-center'>{children}</div>
      </div>
    </div>
  )
}

export default GlowingContainer
