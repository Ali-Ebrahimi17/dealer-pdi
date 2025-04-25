'use client'

import React, { useEffect, useState } from 'react'
import GlowingContainer from './GlowingContainer'
import { capitalizeFirstLetterOfAllWords } from '@/lib/helper_functions'

interface DealerStatsProps {
  top5Internalfaults: Array<{ _id: string; count: number }>
  top5DoaClaims: Array<{ _id: string; count: number }>
  model: string | undefined
}

const DealerStats: React.FC<DealerStatsProps> = ({ top5Internalfaults, top5DoaClaims, model }) => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  // Check if we're in fullscreen mode
  useEffect(() => {
    const checkFullScreen = () => {
      // Use type assertions more safely for browser-specific fullscreen properties
      const doc = document as Document & {
        webkitFullscreenElement?: Element
        mozFullScreenElement?: Element
        msFullscreenElement?: Element
      }

      const fullscreenElement = doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement

      setIsFullScreen(!!fullscreenElement)
    }

    // Initial check
    checkFullScreen()

    // Add event listener for fullscreen changes
    document.addEventListener('fullscreenchange', checkFullScreen)
    document.addEventListener('webkitfullscreenchange', checkFullScreen)
    document.addEventListener('mozfullscreenchange', checkFullScreen)
    document.addEventListener('MSFullscreenChange', checkFullScreen)

    return () => {
      // Clean up
      document.removeEventListener('fullscreenchange', checkFullScreen)
      document.removeEventListener('webkitfullscreenchange', checkFullScreen)
      document.removeEventListener('mozfullscreenchange', checkFullScreen)
      document.removeEventListener('MSFullscreenChange', checkFullScreen)
    }
  }, [])

  // Use provided data or fallback to defaults
  const defectsData = top5Internalfaults
  const claimsData = top5DoaClaims

  // Calculate row height based on fullscreen state
  const getRowClass = () => {
    const baseClass = 'px-2 rounded-md flex items-center justify-between w-full'

    // Fine-tuned rows in normal mode to fit all 5 items with better spacing
    if (!isFullScreen) {
      return `${baseClass} mb-1 py-1.5`
    }

    return `${baseClass} py-3`
  }

  return (
    <div className='flex flex-col xl:flex-row gap-3 xl:gap-4 h-full'>
      {/* Top 5 Defects */}
      <div className='flex-1 flex flex-col min-h-0'>
        <GlowingContainer title={`${model} Top 5 Int Defects`} className='flex-1 flex flex-col h-full overflow-hidden'>
          <div className='flex flex-col h-full w-full'>
            {/* Improved header */}
            <div className='sticky top-0 bg-gray-900 text-white text-sm font-semibold mx-1 py-2 px-3 flex items-center justify-between border-b border-gray-700 mb-1.5'>
              <div className='w-8 text-center'>#</div>
              <div className='flex-1 text-left pl-2'>DEFECT</div>
              <div className='w-20 text-right'>COUNT</div>
            </div>

            {/* Content area with balanced padding */}
            <div className='overflow-y-auto min-h-0 flex-1 pb-2 px-1 w-full'>
              {defectsData.map((item, index) => (
                <div key={`defect-${index}`} className={getRowClass()}>
                  <div className='flex items-center min-w-0 flex-1'>
                    <div
                      className={`${
                        isFullScreen ? 'w-7 h-7' : 'w-6 h-6'
                      } rounded-full bg-amber-500 flex items-center justify-center mr-3 text-black font-bold flex-shrink-0`}
                    >
                      {index + 1}
                    </div>
                    <span className='text-white truncate flex-1 text-sm'>{capitalizeFirstLetterOfAllWords(item._id)}</span>
                  </div>
                  <div className='text-amber-500 font-bold ml-2 w-12 text-right flex-shrink-0'>{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </GlowingContainer>
      </div>

      {/* Warranty Claims */}
      <div className='flex-1 flex flex-col min-h-0'>
        <GlowingContainer title={`${model} Top 5 DOA Claims`} className='flex-1 flex flex-col h-full overflow-hidden'>
          <div className='flex flex-col h-full w-full'>
            {/* Improved header */}
            <div className='sticky top-0  bg-gray-900 text-white text-sm font-semibold mx-1 py-2 px-3 flex items-center justify-between border-b border-gray-700 mb-1.5 '>
              <div className='w-8 text-center'>#</div>
              <div className='flex-1 text-left pl-2'>CLAIM</div>
              <div className='w-20 text-right'>COUNT</div>
            </div>

            {/* Content area with balanced padding */}
            <div className='overflow-y-auto min-h-0 flex-1 pb-2 px-1 w-full'>
              {claimsData.map((item, index) => (
                <div key={`claim-${index}`} className={getRowClass()}>
                  <div className='flex items-center min-w-0 flex-1'>
                    <div
                      className={`${
                        isFullScreen ? 'w-7 h-7' : 'w-6 h-6'
                      } rounded-full bg-orange-500 flex items-center justify-center mr-3 text-black font-bold flex-shrink-0`}
                    >
                      {index + 1}
                    </div>
                    <span className='text-white truncate flex-1 text-sm'>{capitalizeFirstLetterOfAllWords(item._id)}</span>
                  </div>
                  <div className='text-amber-500 font-bold ml-2 w-20 text-right flex-shrink-0'>{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </GlowingContainer>
      </div>
    </div>
  )
}

export default DealerStats
