'use client'

import React, { useState, useEffect } from 'react'

import { Play, Pause, RotateCcw } from 'lucide-react'
import { ArrowDown } from 'lucide-react'
import GlowingContainer from './GlowingContainer'

type Props = {
  isRunning: boolean
  start: Date
  inspectionMins: number
}

const TimeDisplay = ({ isRunning, start, inspectionMins = 60 }: Props) => {
  const now = Number(new Date()) / 1000
  const endTimeMs = Number(new Date(start)) / 1000

  const inspectionSeconds = inspectionMins * 60

  const remaining = Math.round(endTimeMs - now + inspectionSeconds)

  // console.log('START => ', startTimeMs)
  // console.log('END => ', endTimeMs)
  // console.log('SECONDS LEFT => ', remaining)
  // console.log('NOW => ', now)

  // Starting from 60 minutes (3600 seconds)
  // const initialTime = 3600
  const initialTime = remaining
  // Set default to 60 minutes (3600 seconds) remaining
  const [timeLeft, setTimeLeft] = useState<number>(remaining)

  // console.log('TIMELEFT =>', timeLeft / 60)

  // Calculate progress and display time
  const progress = timeLeft / initialTime
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const displayTime = `${minutes}:${seconds.toString().padStart(2, '0')}`

  // Color function for progress bar - green when full time, red when time's almost up
  const getTimerTextColor = () => {
    if (timeLeft / 60 > 45) {
      return 'text-closed'
    } else if (timeLeft / 60 > 15) {
      return 'text-contained'
    } else if (timeLeft / 60 > 5) {
      return 'text-open'
    } else {
      return 'text-white bg-open animate-pulse'
    }
  }

  // Effect to control the timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft <= 0) {
      setTimeLeft(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  // Reset timer function
  const resetTimer = () => {
    setTimeLeft(initialTime)
  }

  // Toggle timer function
  // const toggleTimer = () => {
  //   setIsRunning((prevState) => !prevState)
  // }

  return (
    <GlowingContainer
      title='Timer'
      headerActions={
        <div className='flex space-x-1 sm:space-x-2'>
          {/* <button
            className='flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-colors'
            // onClick={toggleTimer}
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          >
            {isRunning ? (
              <Pause className='h-3 w-3 sm:h-3.5 sm:w-3.5 text-white' />
            ) : (
              <Play className='h-3 w-3 sm:h-3.5 sm:w-3.5 text-white ml-0.5' />
            )}
          </button> */}
          {/* <button
            className='flex items-center justify-center bg-rose-500 hover:bg-rose-600 rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-colors'
            onClick={resetTimer}
            aria-label='Reset timer'
          >
            <RotateCcw className='h-3 w-3 sm:h-3.5 sm:w-3.5 text-white' />
          </button> */}
        </div>
      }
    >
      <div className={`p-2 h-full flex flex-col justify-center ${getTimerTextColor()} w-full`}>
        {/* Time countdown indicator - responsive positioning */}
        {/* {isRunning && timeLeft < initialTime && (
          <div className='absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2'>
            <ArrowDown className='h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-500 animate-bounce' />
          </div>
        )} */}

        {/* Timer display - responsive text sizing */}
        <div className='-mt-1 flex items-center justify-center'>
          <span className={`font-digital text-9xl font-bold  responsive-text-2xl `}>{displayTime}</span>
        </div>

        {/* Progress bar - responsive heights */}
        {/* <div className=' bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden'>
          <div
            className={`${getProgressBarColor()} h-full rounded-full transition-all duration-300`}
            style={{
              width: `${progress * 100}%`,
            }}
          ></div>
        </div> */}
      </div>
    </GlowingContainer>
  )
}

export default TimeDisplay
