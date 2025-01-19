'use client'

import { ChangeEvent, useState } from 'react'
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
import { DashboardShell } from '@/components/patientDashboard/dashboard-shell'
import {
  EditProfileForm,
  AddPhone,
} from '@/components/patientDashboard/formsPatientProfile'
import { Separator } from '@/components/ui/separator'
import { useForm } from 'react-hook-form'
import { Building2, Mail, MapPin, Phone, Plus } from 'lucide-react'

export interface Address {
  street?: string
  city?: string
  state?: string
  postal_code?: string
}

export interface PatientProfile {
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

const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
  // Reemplazar cualquier carácter que no sea un número
  event.target.value = event.target.value.replace(/[^0-9]/g, '')
}

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)
  const [addressOpen, setAddressOpen] = useState(false)

  const formEdit = useForm<PatientProfile>()

  return (
    <DashboardShell>
      <div className='container mx-auto max-w-4xl py-6'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Patient Profile
            </h1>
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
                <Dialog open={} onOpenChange={}>
                  <DialogTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <Plus className='h-4 w-4' />
                    </Button>
                  </DialogTrigger>
                  <AddPhone />
                </Dialog>
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
    </DashboardShell>
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
