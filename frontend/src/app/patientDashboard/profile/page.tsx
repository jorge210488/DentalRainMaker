'use client'

import { ChangeEvent, useState } from 'react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DashboardShell } from '@/components/patientDashboard/dashboard-shell'
import {
  EditProfileForm,
  AddPhone,
  AddEmail,
  AddAddress,
} from '@/components/patientDashboard/formsPatientProfile'
import { Separator } from '@/components/ui/separator'
import { Mail, Phone, Plus } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/slices/userSlice'
import { fetchContactById } from '@/server/contacts'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

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
  birth_date: string
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

  const dispatch = useDispatch()
  const { data: session } = useSession()

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (
          session?.user?.token &&
          session?.user?.userId &&
          session?.user?.clinicId
        ) {
          const userData = await fetchContactById(
            session.user.clinicId,
            session.user.userId,
            session.user.token,
          )
          dispatch(setUser(userData))
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error)
      }
    }

    loadUserProfile()
  }, [dispatch, session])

  const {
    given_name,
    family_name,
    primary_email_address,
    state,
    email_addresses,
    phone_numbers,
    addresses,
    birth_date,
  } = useSelector((state: RootState) => state.user)

  const userState = useSelector((state: RootState) => state.user)

  console.log('userState', userState)

  // Convierte `state` a formato con la primera letra en mayúscula
  const formattedState =
    state.charAt(0).toUpperCase() + state.slice(1).toLowerCase()

  return (
    <div className='container mx-0 w-[95%] py-2 font-sans sm:mx-auto sm:max-w-4xl sm:py-6 md:overflow-y-hidden'>
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
            <EditProfileForm
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              patientInfo={PatientProfile}
            />
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
                  <p className='text-2xl font-semibold'>{`${given_name} ${family_name}`}</p>
                  <p className='text-muted-foreground text-sm'>
                    {`${primary_email_address}`}
                  </p>
                </div>
                <Badge
                  variant={getStateVariant('ACTIVE')}
                >{`${formattedState}`}</Badge>
              </div>
              <Separator />
              <div className='grid gap-2 text-sm'>
                <div className='grid grid-cols-2 gap-1'>
                  <p className='text-muted-foreground'>Birthday</p>
                  <p>{birth_date}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='grid gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <div className='flex w-full flex-row items-center justify-between'>
                <div className='flex items-center'>
                  <div className='bg-muted pt-0.8 rounded-full'>
                    <Phone className='text-muted-foreground h-4 w-4' />
                  </div>
                  <CardTitle className='ml-3 text-base font-semibold'>
                    Contact Phone Numbers
                  </CardTitle>
                </div>
              </div>
              <Dialog
                open={phoneOpen}
                onOpenChange={() => setPhoneOpen(!phoneOpen)}
              >
                <DialogTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <Plus className='h-4 w-4' />
                  </Button>
                </DialogTrigger>
                <AddPhone
                  phoneOpen={phoneOpen}
                  patientInfo={PatientProfile}
                  setPhoneOpen={setPhoneOpen}
                />
              </Dialog>
            </CardHeader>
            <CardContent>
              {phone_numbers && phone_numbers.length > 0 ? (
                <ul className='space-y-2'>
                  {phone_numbers.map((phone, index) => (
                    <li
                      key={index}
                      className='flex items-center justify-between'
                    >
                      <span>{phone.number}</span>
                      <span className='text-muted-foreground text-sm'>
                        {phone.type.toLowerCase()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState text='No phone numbers added' />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <div className='flex w-full flex-row items-center justify-between'>
                <div className='flex items-center'>
                  <div className='bg-muted pt-0.8 rounded-full'>
                    <Mail className='text-muted-foreground h-4 w-4' />
                  </div>
                  <CardTitle className='ml-3 text-base font-semibold'>
                    Email Addresses
                  </CardTitle>
                </div>
              </div>
              <Dialog
                open={emailOpen}
                onOpenChange={() => setEmailOpen(!emailOpen)}
              >
                <DialogTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <Plus className='h-4 w-4' />
                  </Button>
                </DialogTrigger>
                <AddEmail
                  emailOpen={emailOpen}
                  patientInfo={PatientProfile}
                  setEmailOpen={setEmailOpen}
                />
              </Dialog>
            </CardHeader>
            <CardContent>
              {email_addresses && email_addresses.length > 0 ? (
                <ul className='space-y-2'>
                  {email_addresses.map((email, index) => (
                    <li
                      key={index}
                      className='flex items-center justify-between'
                    >
                      <span>{email.address}</span>
                      <span className='text-muted-foreground text-sm'>
                        {email.type
                          .replace('EMAIL_ADDRESS_TYPE_', '')
                          .toLowerCase()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState text='No email addresses added' />
              )}
            </CardContent>
          </Card>

          <Card className='md:col-span-2'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-base font-semibold'>
                Addresses
              </CardTitle>
              <Dialog
                open={addressOpen}
                onOpenChange={() => setAddressOpen(!addressOpen)}
              >
                <DialogTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <Plus className='h-4 w-4' />
                  </Button>
                </DialogTrigger>
                <AddAddress
                  addressOpen={addressOpen}
                  patientInfo={PatientProfile}
                  setAddressOpen={setAddressOpen}
                />
              </Dialog>
            </CardHeader>
            <CardContent>
              {addresses && addresses.length > 0 ? (
                <ul className='space-y-4'>
                  {addresses.map((address, index) => (
                    <li key={index} className='flex flex-col gap-1'>
                      <p className='font-semibold'>{address.street_address}</p>
                      <p className='text-muted-foreground text-sm'>
                        {address.city}, {address.state}, {address.postal_code}
                      </p>
                      <p className='text-muted-foreground text-sm'>
                        {address.country_code || 'N/A'}
                      </p>
                      <p className='text-muted-foreground text-sm italic'>
                        {address.type
                          .replace('ADDRESS_TYPE_', '')
                          .toLowerCase()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState text='No addresses added' />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className='flex flex-col items-center justify-center py-8 text-center'>
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
