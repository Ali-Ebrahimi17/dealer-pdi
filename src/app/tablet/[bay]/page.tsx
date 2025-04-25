import { Button } from '@nextui-org/react'

import { FaRegSmile } from 'react-icons/fa'

import MainHeader from '@/components/layout/MainHeader'
import AssignInspectionForm from '@/components/inspection/AssignInspectionForm'
import { getLatestData } from '@/app/actions/inspectionActions'

const TabletPage = async ({ params }: { params: { bay: string } }) => {
  const bayNumber = params.bay

  const inspection = await getLatestData(bayNumber)

  console.log(inspection.open === true)

  return (
    <div>
      <MainHeader mainText='Dealer PDI Tablet' subText={`Bay ${bayNumber}`} />

      <div className='mt-2 mb-12'>
        <AssignInspectionForm bay={bayNumber} inspectionOpen={inspection.open === true} />
      </div>
    </div>
  )
}

export default TabletPage
