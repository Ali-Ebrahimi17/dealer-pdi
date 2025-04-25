'use client'

import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import GlowingContainer from './GlowingContainer'

// import { useTheme } from "@/context/ThemeContext";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface LineChartProps {
  title?: string
}

const LineChart: React.FC<LineChartProps> = ({ title = 'Dealer DPU' }) => {
  // const { theme } = useTheme();
  const isDarkMode = true

  // Text color based on theme
  const textColor = 'rgba(255, 255, 255, 0.8)'
  const gridColor = 'rgba(255, 255, 255, 0.1)'

  // JCB yellow color for chart
  const jcbYellow = '#f7c948'
  const jcbYellowTransparent = 'rgba(247, 201, 72, 0.3)'

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'DPU',
        data: [12, 19, 16, 15, 14, 13],
        borderColor: jcbYellow,
        backgroundColor: jcbYellowTransparent,
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: jcbYellow,
        pointBorderColor: '#000',
        pointBorderWidth: 1,
        pointHoverRadius: 6,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: textColor,
          font: {
            weight: 'bold',
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
          weight: 'bold',
          size: 14,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 20,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
          font: {
            weight: 'bold',
          },
        },
        title: {
          display: true,
          text: 'Defects Per Unit',
          color: textColor,
          font: {
            weight: 'bold',
          },
        },
      },
      x: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
          font: {
            weight: 'bold',
          },
        },
      },
    },
  }

  return (
    <GlowingContainer title={title}>
      <div className='w-full h-full p-1'>
        <Line data={data} options={options} />
      </div>
    </GlowingContainer>
  )
}

export default LineChart
