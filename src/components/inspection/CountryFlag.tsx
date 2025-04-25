'use client'

import React from 'react'
import Image from 'next/image'
import GlowingContainer from './GlowingContainer'

interface CountryFlagProps {
  flagSrc?: string
  countryName?: string
  countryCode?: string
  title?: string
}

const CountryFlag: React.FC<CountryFlagProps> = ({
  flagSrc = '/flag-uk.svg',
  countryName = 'United Kingdom',
  countryCode = 'UK',
  title = 'Country',
}) => {
  return (
    <GlowingContainer title={countryName}>
      <div className='flex flex-col items-center justify-between h-full w-full p-2'>
        <div className='relative w-[80%] h-[92%] flex items-center justify-center mx-auto mt-1 overflow-hidden rounded-sm '>
          <Image
            // src={flagSrc}
            src={`${flagSrc}`}
            alt={`Flag of ${countryName}`}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            className='object-contain '
          />
        </div>
        {/* <div className='w-full px-2 pb-1 mt-auto'>
          <h3 className='text-2xl font-extrabold text-center w-full'>{countryName}</h3>
        </div> */}
      </div>
    </GlowingContainer>
  )
}

export default CountryFlag
