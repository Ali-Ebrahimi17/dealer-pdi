import MainHeader from '@/components/layout/MainHeader'

import { Spinner } from '@nextui-org/react'
import ScreenDashboard from '@/components/inspection/ScreenDashboard'
import { getLatestData } from '@/app/actions/inspectionActions'
const ScreenDashPage = async ({ params }: { params: { bay: string } }) => {
  const bayNumber = params.bay

  const inspection = await getLatestData(bayNumber)

  // console.log('FROM DB => ', inspection)

  const dashboardData = {
    buildNumber: 'JAN551385',
    serialNumber: '3468530',
    model: 'P55-550-190',
    dealer: 'OLIVER LANDPOWER UK',
    dealerLogo: '/images/dealer-logos/oliver-landpower.png',
    dealerName: 'Oliver Landpower Ltd',
    countryFlag: '/country-flags/gb.svg',
    countryName: 'United Kingdom',
    currentDpuValue: 0,
    intFaults: 0,
    // targetDpuValue: 10,
    // modelImage: '/images/jcb-model.png',
    // modelFile: '/ldl.glb',
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
  }

  return (
    <div>
      {/* <MainHeader mainText={`Bay ${bayNumber}`} /> */}

      <ScreenDashboard data={inspection} bayNumber={bayNumber} />
    </div>
  )
}

export default ScreenDashPage
