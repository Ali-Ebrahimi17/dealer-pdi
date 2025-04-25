'use client'

import React from 'react'
import Image from 'next/image'
import GlowingContainer from './GlowingContainer'

interface DealerLogoProps {
  logoSrc?: string
  dealerName?: string
  title?: string
}

const DealerLogo: React.FC<DealerLogoProps> = ({ logoSrc, dealerName = 'JCB Construction', title = 'Dealer' }) => {
  return (
    <GlowingContainer title={title}>
      <div className='flex flex-col items-center justify-center h-full w-full p-2'>
        {/* <div className='relative w-[65%] h-[50px] flex items-center justify-center mx-auto mt-2'>
          <Image
            src={logoSrc}
            alt={`${dealerName} logo`}
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            priority
            className='mx-auto'
          />
        </div> */}
        <div className='w-full px-2'>
          <h3 className='text-4xl font-extrabold text-center w-full'>{dealerName}</h3>
        </div>
      </div>
    </GlowingContainer>
  )
}

export default DealerLogo
