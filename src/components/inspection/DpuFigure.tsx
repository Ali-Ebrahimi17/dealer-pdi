'use client'

import React from 'react'
import { TrendingDown, AlertTriangle, AlertCircle } from 'lucide-react'
import GlowingContainer from './GlowingContainer'

// import { useTheme } from "@/context/ThemeContext";

interface DpuFigureProps {
  title: string
  current: number
  target: number
  trend: 'decreasing' | 'increasing' | 'stable'
  status: 'normal' | 'warning' | 'critical'
  suffix?: string
}

const DpuFigure: React.FC<DpuFigureProps> = ({ title, current, target, trend, status, suffix = '' }) => {
  // const { theme } = useTheme();
  // const isDarkMode = theme === "dark";

  const statusIcons = {
    normal: <TrendingDown className='w-6 h-6 text-green-500' />,
    warning: <AlertTriangle className='w-6 h-6 text-amber-500' />,
    critical: <AlertCircle className='w-6 h-6 text-red-500' />,
  }

  const statusMessages = {
    normal: 'Performance is good',
    warning: 'Requires attention',
    critical: 'Critical issue - action required',
  }

  const statusColors = {
    normal: 'text-green-500',
    warning: 'text-amber-500',
    critical: 'text-red-500',
  }

  // Get defect number color based on value
  const getDefectNumberColor = () => {
    if (status === 'normal') {
      return 'text-green-500' // Green for 0-1 defects
    } else if (status === 'warning') {
      return 'text-amber-500' // Amber for 2-5 defects
    } else {
      return 'text-red-500' // Red for >5 defects
    }
  }

  const getTrendColor = () => {
    if ((title.includes('DPU') && trend === 'decreasing') || (title.includes('OTD') && trend === 'increasing')) {
      return 'text-green-500'
    } else if (trend === 'stable') {
      return 'text-amber-500'
    } else {
      return 'text-red-500'
    }
  }

  return (
    <GlowingContainer title='Internal Faults'>
      <div className='flex flex-col items-center justify-between h-full px-2 py-2'>
        {/* <div className='flex items-center justify-between w-full'>
          <div className='flex items-center'>
            {statusIcons[status]}
            <span className={`ml-2 text-xs whitespace-nowrap ${statusColors[status]}`}>{statusMessages[status]}</span>
          </div>
        </div> */}

        <div className='flex items-center justify-center flex-grow h-full'>
          <div className={`text-9xl font-extrabold text-center `}>
            {current}
            {suffix}
          </div>
        </div>
      </div>
    </GlowingContainer>
  )
}

export default DpuFigure
