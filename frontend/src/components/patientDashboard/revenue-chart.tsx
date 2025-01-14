// 'use client'

// import { Line } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// } from 'chart.js'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// )

// const labels = [
//   'Jan',
//   'Feb',
//   'Mar',
//   'Apr',
//   'May',
//   'Jun',
//   'Jul',
//   'Aug',
//   'Sep',
//   'Oct',
//   'Nov',
//   'Dec',
// ]

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Revenue',
//       data: [
//         120000, 125000, 135000, 130000, 140000, 138000, 142000, 140000, 145000,
//         142000, 148000, 142384,
//       ],
//       borderColor: 'rgb(59, 130, 246)',
//       backgroundColor: 'rgba(59, 130, 246, 0.1)',
//       fill: true,
//     },
//   ],
// }

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: false,
//     },
//   },
//   scales: {
//     y: {
//       beginAtZero: true,
//       ticks: {
//         callback: (value: number) => `$${value.toLocaleString()}`,
//       },
//     },
//   },
// }

export function RevenueChart() {
  return (
    <div className='h-[300px]'>
      {/* <Line data={data} options={options} /> */}
    </div>
  )
}
