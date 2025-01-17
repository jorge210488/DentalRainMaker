'use client'

import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
  labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
  datasets: [
    {
      data: [15, 25, 30, 20, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(167, 139, 250, 0.8)',
        'rgba(196, 181, 253, 0.8)',
      ],
      borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff'],
      borderWidth: 2,
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
  cutout: '60%',
}

export function AgeDistribution() {
  return (
    <div className='flex h-[300px] items-center justify-center'>
      <Doughnut data={data} options={options} />
    </div>
  )
}
