'use client'

import { Button, Input } from '@nextui-org/react'
import { FaRegSmile } from 'react-icons/fa'

import { endInspection, startInspection } from '@/app/actions/inspectionActions'
import { useState } from 'react'

type Props = {
  bay: string
  inspectionOpen: boolean
}

const AssignInspectionForm = ({ bay, inspectionOpen }: Props) => {
  const [serialNumber, setSerialNumber] = useState('')
  const [dealerName, setDealerName] = useState('')

  const [inspectionActive, setInspectionActive] = useState(inspectionOpen)

  const startScreen = async () => {
    try {
      // console.log('SERIAL NUMBER => ', serialNumber)
      // console.log('BAY NUMBER => ', bay)
      const result = await startInspection(bay, serialNumber, dealerName)

      // console.log('RESULT => ', result)

      if (result.success) {
        setInspectionActive(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const EndScreen = async () => {
    setInspectionActive(false)
    setSerialNumber('')
    const result = await endInspection(bay)

    // console.log('RESULT => ', result)
  }
  return (
    <section className='flex justify-center mt-8'>
      <div className='w-[450px] text-center'>
        {inspectionActive ? (
          <>
            <div className='mb-2 text-xl'>Inspection Active</div>
            <Button onClick={EndScreen} className='bg-red-500 h-12 '>
              End Inspection <FaRegSmile size={20} />
            </Button>
          </>
        ) : (
          <>
            <div className='pl-1 text-start mb-2'>Serial Number</div>
            <div className='mt-2 mb-12'>
              <div>
                <Input className='mb-4' placeholder='Serial Number' onChange={(e) => setSerialNumber(e.target.value)} type='text'>
                  Serial Number
                </Input>
                <div className='pl-1 text-start mb-2'>Dealer</div>
                <Input className='mb-12' placeholder='Dealer' onChange={(e) => setDealerName(e.target.value)} type='text'>
                  Dealer
                </Input>
                {/* <div className='pl-1 text-start mb-2'>Country</div>
                <Input className='mb-12' placeholder='Country' onChange={(e) => setCountry(e.target.value)} type='text'>
                  Country
                </Input> */}

                <Button onClick={startScreen} disabled={serialNumber.trim().length !== 7} className='bg-green-500 w-full'>
                  Start Inspection <FaRegSmile size={20} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default AssignInspectionForm
