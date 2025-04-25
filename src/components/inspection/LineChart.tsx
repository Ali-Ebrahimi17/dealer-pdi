'use client'

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  BarElement,
  defaults,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import GlowingContainer from './GlowingContainer'

import ChartDataLabels from 'chartjs-plugin-datalabels'

// import { useTheme } from "@/context/ThemeContext";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement)

// defaults.color = 'white'
// defaults.borderColor = '#808588'
defaults.font.family = 'Lato'
defaults.maintainAspectRatio = false
defaults.responsive = true

interface LineChartProps {
  title?: string
  dataArr: Array<{ month: string; machines: number; claims: number; dpu: number }>
}

const LineChart = ({ title = 'Dealer DPU', dataArr }: LineChartProps) => {
  // const { theme } = useTheme();
  const isDarkMode = true

  // Text color based on theme
  const textColor = 'rgba(255, 255, 255, 0.8)'
  const gridColor = 'rgba(255, 255, 255, 0.1)'

  // JCB yellow color for chart
  const jcbYellow = '#f7c948'
  const jcbYellowTransparent = 'rgba(247, 201, 72, 0.5)'

  const labels = dataArr.map((item) => item.month)
  const dpuArr = dataArr.map((item) => item.dpu)

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'DPU',
        data: dpuArr,
        datalabels: {
          display: true,
          align: 'end',
          anchor: 'end',
          // offset: -1,
          color: textColor,
          font: {
            // weight: 'bold',
            size: '15px',
          },
          formatter: function (value: any) {
            if (value > 0) {
              return value
            } else {
              return ''
            }
          },
        },
        borderColor: jcbYellow,
        backgroundColor: jcbYellowTransparent,
        tension: 0.4,
        fill: true,
        borderWidth: 3,

        pointRadius: 4,
        pointBackgroundColor: jcbYellow,
        pointBorderColor: '#000',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 50,
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
        labels: {
          color: textColor,
          font: {
            // weight: 'bold',
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDarkMode ? jcbYellow : '#000000',
        bodyColor: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        borderColor: jcbYellow,
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        titleFont: {
          // weight: 'bold',
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        // suggestedMax: 10,
        grid: {
          display: false,
          color: gridColor,
        },
        ticks: {
          display: false,
          color: textColor,
          font: {
            // weight: 'bold',
          },
        },
        title: {
          display: false,
          text: 'Defects Per Unit',
          color: textColor,
          font: {
            // weight: 'bold',
          },
        },
      },
      x: {
        grid: {
          display: false,
          color: gridColor,
        },
        ticks: {
          color: textColor,
          font: {
            // weight: 'bold',
          },
        },
      },
    },
  }

  return (
    <GlowingContainer title={title}>
      <div className='w-full h-full p-1'>
        <Bar data={data as any} options={options} plugins={[ChartDataLabels]} />
      </div>
    </GlowingContainer>
  )
}

export default LineChart
