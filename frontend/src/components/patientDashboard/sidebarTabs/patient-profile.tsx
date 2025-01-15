'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Building2, Mail, MapPin, Phone, Plus } from 'lucide-react'

interface Address {
  street?: string
  city?: string
  state?: string
  postal_code?: string
}

interface PatientProfile {
  name: string
  given_name: string
  family_name: string
  primary_email_address: string
  state: string
  addresses: Address[]
  phone_numbers: string[]
  email_addresses: string[]
  createdAt: string
}

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className='container mx-auto max-w-4xl py-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Patient Profile</h1>
          <p className='text-muted-foreground'>
            View and manage patient information
          </p>
        </div>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className='max-w-2xl'>
            <DialogHeader>
              <DialogTitle>Edit Patient Information</DialogTitle>
            </DialogHeader>
            <EditProfileForm onClose={() => setIsEditing(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className='grid gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-2xl font-semibold'>Jorge Martínez</p>
                  <p className='text-muted-foreground text-sm'>
                    jorge@email.com
                  </p>
                </div>
                <Badge variant={getStateVariant('ACTIVE')}>Active</Badge>
              </div>
              <Separator />
              <div className='grid gap-2 text-sm'>
                <div className='grid grid-cols-2 gap-1'>
                  <p className='text-muted-foreground'>Created</p>
                  <p>{format(new Date('2025-01-08T16:59:23.916Z'), 'PPP')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-base font-semibold'>
                Contact Phone Numbers
              </CardTitle>
              <Button variant='ghost' size='icon'>
                <Plus className='h-4 w-4' />
              </Button>
            </CardHeader>
            <CardContent>
              <EmptyState icon={Phone} text='No phone numbers added' />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-base font-semibold'>
                Email Addresses
              </CardTitle>
              <Button variant='ghost' size='icon'>
                <Plus className='h-4 w-4' />
              </Button>
            </CardHeader>
            <CardContent>
              <EmptyState icon={Mail} text='No additional emails added' />
            </CardContent>
          </Card>

          <Card className='md:col-span-2'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-base font-semibold'>
                Addresses
              </CardTitle>
              <Button variant='ghost' size='icon'>
                <Plus className='h-4 w-4' />
              </Button>
            </CardHeader>
            <CardContent>
              <EmptyState icon={MapPin} text='No addresses added' />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function EditProfileForm({ onClose }: { onClose: () => void }) {
  return (
    <form className='grid gap-4 py-4'>
      <div className='grid gap-2'>
        <Label htmlFor='given_name'>Given Name</Label>
        <Input id='given_name' defaultValue='Jorge' />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='family_name'>Family Name</Label>
        <Input id='family_name' defaultValue='Martínez' />
      </div>
      <div className='grid gap-2'>
        <Label htmlFor='email'>Primary Email</Label>
        <Input id='email' type='email' defaultValue='jorge@email.com' />
      </div>
      <div className='flex justify-end gap-2'>
        <Button variant='outline' type='button' onClick={onClose}>
          Cancel
        </Button>
        <Button type='submit'>Save Changes</Button>
      </div>
    </form>
  )
}

function EmptyState({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className='flex flex-col items-center justify-center py-8 text-center'>
      <div className='bg-muted mb-3 rounded-full p-3'>
        <Icon className='text-muted-foreground h-6 w-6' />
      </div>
      <p className='text-muted-foreground text-sm'>{text}</p>
    </div>
  )
}

function getStateVariant(
  state: string,
): 'default' | 'secondary' | 'destructive' {
  switch (state) {
    case 'ACTIVE':
      return 'default'
    case 'INACTIVE':
      return 'secondary'
    case 'SUSPENDED':
      return 'destructive'
    default:
      return 'secondary'
  }
}
