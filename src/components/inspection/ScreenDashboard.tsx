'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import socket from '@/lib/socket'
import CountryFlag from './CountryFlag'
import DealerLogo from './DealerLogo'
import DealerStats from './DealerStats'
import DpuFigure from './DpuFigure'
import EquipmentInfo from './EquipmentInfo'
import LineChart from './LineChart'
import TimeDisplay from './TimeDisplay'
import { getLatestData } from '@/app/actions/inspectionActions'

interface Props {
  data: {
    buildNumber?: string
    serialNumber?: string
    model?: string
    dealer?: string
    dealerLogo?: string
    dealerName?: string
    countryFlag?: string
    countryName?: string
    currentDpuValue: number
    intFaults: number
    open: boolean
    started: Date

    // modelImage?: string
    // modelFile?: string
    top5Internalfaults: Array<{ _id: string; count: number }>
    top5DoaClaims: Array<{ _id: string; count: number }>
  }
  bayNumber?: string
}

const ScreenDashboard = ({
  data = {
    buildNumber: 'TBC',
    serialNumber: 'TBC',
    model: 'TBC',
    dealer: 'TBC',
    dealerLogo: '/images/dealer-logos/oliver-landpower.png',
    dealerName: 'TBC',
    countryFlag: '/country-flags/gb.svg',
    countryName: 'TBC',
    currentDpuValue: 0,
    intFaults: 0,
    open: false,
    started: new Date(),
    // modelImage: '/dpu/images/jcb-model.png',
    // modelFile: '/dpu/ldl.glb',
    top5Internalfaults: [
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
    ],
    top5DoaClaims: [
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
      { _id: 'tbc', count: 0 },
    ],
  },
  bayNumber = '0',
}: Props) => {
  const [inspectionActive, setInspectionActive] = useState(false)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const [socketData, setsocketData] = useState('')
  const [screenData, setScreenData] = useState({
    ...data,
  })

  const updateDash = async () => {
    try {
      const result = await getLatestData(bayNumber)
      console.log('RESULT => ', result)
      // setScreenData((prev) => ({
      //   ...prev,
      //   ...result,
      //   startTime: Number(new Date()),
      //   // currentDpuValue: result.intFaults,
      //   // countryFlag: `/country-flags/${result.countryFlag.toLowerCase()}.svg`,
      // }))

      if (result.open === true) {
        setInspectionActive(true)
        setIsRunning(true)
        setScreenData(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    socket.on('start', (data) => {
      // console.log('start')
      // console.log('Recieved from SERVER ::', data)

      if (data && data.bay === bayNumber) {
        setsocketData(data)
        updateDash()
      }
    })
    socket.on('end', (data) => {
      // console.log('end')
      // console.log('Recieved from SERVER ::', data)
      if (data && data.bay === bayNumber) {
        // setsocketData(data)
        setInspectionActive(false)
        setIsRunning(false)
      }
    })
    return () => {
      socket.off('start') // This represents the unmount function.
      socket.off('end') // This represents the unmount function.
    }
  }, [socket, bayNumber])

  useEffect(() => {
    console.log('FORMATTED => ', screenData)
    if (screenData.open === true) {
      setInspectionActive(true)
    }
  }, [screenData])

  useEffect(() => {
    console.log('FORMATTED => ', screenData)
    if (data.open === true) {
      setInspectionActive(true)
      setScreenData(data)
      setIsRunning(true)
    }
  }, [data])

  // const startScreen = async () => {
  //   try {
  //     console.log('SERIAL NUMBER => ', serialNumber)
  //     console.log('BAY NUMBER => ', bay)
  //     const result = await startInspection(bay, serialNumber)

  //     console.log('RESULT => ', result)

  //     if (result.success) {
  //       setInspectionActive(true)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const EndScreen = async () => {
  //   setInspectionActive(false)
  //   setSerialNumber('')
  //   const result = await endInspection(bay)

  //   console.log('RESULT => ', result)
  // }
  return (
    <>
      {inspectionActive ? (
        <div className='responsive-container flex flex-col pt-5'>
          {/* Header - fixed height */}
          {/* <div className='flex-none w-full'>
         <DashboardHeader bayNumber={bayNumber} />
       </div> */}

          {/* Equipment Info Bar - fixed height */}
          <div className='flex-none w-full'>
            <EquipmentInfo
              buildNumber={screenData.buildNumber || ''}
              serialNumber={screenData.serialNumber || ''}
              model={screenData.model || ''}
              // customer={screenData.dealer || ''}
              bay={bayNumber}
            />
          </div>

          {/* Main Dashboard Grid - takes remaining height with padding */}
          <div className='flex-1 p-2 md:p-3 grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-3 min-h-0 max-w-full overflow-hidden'>
            {/* Left Column (spans 6 columns on large screens, full width on small) */}
            <div className='lg:col-span-6 flex flex-col gap-2 md:gap-3 min-h-0 w-full'>
              {/* Top row with equal height containers */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 h-[200px] '>
                <DealerLogo logoSrc={data.dealerLogo} dealerName={screenData.dealer} title='Dealer' />
                <CountryFlag flagSrc={screenData.countryFlag} countryName={screenData.countryName} title='Country' />
              </div>
              {/* 3D Model - takes remaining height */}
              <div className='flex-1 min-h-0 w-full'>
                {/* <ModelDisplay modelName={data.model || 'Equipment'} modelFile={data.modelFile} modelImage={data.modelImage} /> */}
              </div>
            </div>

            {/* Right Column (spans 6 columns on large screens, full width on small) */}
            <div className='lg:col-span-6 flex flex-col gap-2 md:gap-3 min-h-0 w-full'>
              {/* Top row with equal height containers - matching the left column's top row */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 h-[200px] '>
                <DpuFigure
                  title='Internal Defects'
                  current={screenData.intFaults}
                  target={0}
                  trend='decreasing'
                  status={screenData.intFaults <= 10 ? 'normal' : screenData.intFaults <= 35 ? 'warning' : 'critical'}
                />
                <TimeDisplay isRunning={isRunning} start={screenData.started} />
              </div>
              {/* Line Chart - height adjusts based on screen size */}
              <div className='h-[270px]  w-full'>
                <LineChart title={`${screenData.model} DOA DPU`} />
              </div>
              {/* Dealer Stats - takes remaining height, same as the 3D model */}
              <div className='flex-1 min-h-0 w-full'>
                <DealerStats model={screenData.model} top5Internalfaults={screenData.top5Internalfaults} top5DoaClaims={screenData.top5DoaClaims} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section className='flex items-center justify-center h-[calc(100vh_-_270px)] '>
          <div className='ml-20'>
            <div className='flex justify-center'>
              <Image
                className={`transform -scale-x-100 transition -mt-40 `}
                width={860}
                height={860}
                src='/images/machine-svg-icons/loadall.svg'
                alt='machine'
              />
            </div>

            <div className='-mt-40 text-8xl text-center'>Awaiting Inspection</div>
          </div>
        </section>
      )}
    </>
  )
}

export default ScreenDashboard
