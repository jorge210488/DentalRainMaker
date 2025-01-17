import { Card } from '@/components/patientDashboard/ui/card'
import { Mail, MessageSquare, TrendingUp } from 'lucide-react'

const campaigns = [
  {
    name: 'Dental Checkup Reminder',
    sent: 450,
    opened: 385,
    clicked: 180,
  },
  {
    name: 'Holiday Special',
    sent: 1200,
    opened: 890,
    clicked: 420,
  },
]

export function MarketingMetrics() {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-3 gap-4'>
        <Card className='p-4'>
          <div className='flex items-center space-x-2'>
            <Mail className='h-4 w-4 text-blue-600' />
            <span className='text-sm font-medium text-black'>Email Opens</span>
          </div>
          <p className='text-2xl font-bold text-blue-600'>76%</p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center space-x-2'>
            <MessageSquare className='h-4 w-4 text-pink-600' />
            <span className='text-sm font-medium text-black'>SMS Response</span>
          </div>
          <p className='text-2xl font-bold text-pink-600'>42%</p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center space-x-2'>
            <TrendingUp className='h-4 w-4 text-orange-600' />
            <span className='text-sm font-medium text-black'>Engagement</span>
          </div>
          <p className='text-2xl font-bold text-orange-600'>89%</p>
        </Card>
      </div>
      <div className='rounded-lg border text-black'>
        <div className='grid grid-cols-4 gap-4 border-b p-4 font-medium'>
          <div>Campaign</div>
          <div>Sent</div>
          <div>Opened</div>
          <div>Clicked</div>
        </div>
        {campaigns.map((campaign) => (
          <div key={campaign.name} className='grid grid-cols-4 gap-4 p-4'>
            <div>{campaign.name}</div>
            <div>{campaign.sent}</div>
            <div>{campaign.opened}</div>
            <div>{campaign.clicked}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
