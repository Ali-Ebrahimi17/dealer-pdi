'use client'
import React, { useEffect, useState } from 'react'

import socket from '@/lib/socket'

import MainHeader from '@/components/layout/MainHeader'

import { Spinner } from '@nextui-org/react'
const ScreenDashPage = ({ params }: { params: { bay: string } }) => {
  const bayNumber = params.bay

  const [socketData, setsocketData] = useState('')

  useEffect(() => {
    socket.on('start', (data) => {
      console.log('Recieved from SERVER ::', data)

      if (data && data.bay === bayNumber) {
        setsocketData(data)
      }
    })
    socket.on('end', (data) => {
      console.log('Recieved from SERVER ::', data)
      if (data && data.bay === bayNumber) {
        setsocketData(data)
      }
    })
    return () => {
      socket.off('start') // This represents the unmount function.
      socket.off('end') // This represents the unmount function.
    }
  }, [socket, bayNumber])

  return (
    <div>
      <MainHeader mainText='Socket test page' subText='Info' />
      <div>
        <pre>{JSON.stringify(socketData, null, 2)}</pre>
      </div>
    </div>
  )
}

export default ScreenDashPage
