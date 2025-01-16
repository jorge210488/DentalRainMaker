'use client'

import React,{ useEffect} from 'react';
import { useSession } from 'next-auth/react';
import AppointmentCard from '@/components/MainComponents/AppointmentCard/AppointmentCard';
import { stat } from 'fs';

const UpcomingAppointments: React.FC = () => {
    const { data: session, status } = useSession()
    
    useEffect(() => {
        const fetchAppointments = async () => {
            if(status !== 'authenticated') return;
            try {
                const response = await get
            } catch (error) {
                
            }
        }
          
    }, [])



    return (
        <section className="mt-8 space-y-4 w-full">
          <h3 className="text-xl font-semibold mb-4">Your upcoming appointments</h3>
          <AppointmentCard
            _id="1" 
            start_time={new Date("2023-10-01T10:00:00Z")} 
            additional_data={{ 
                doctor_name:"Docstora 1",
                clinic_name:"Clinica 1",
                room_number:"Cuarto 1",
                paid:false}} 
            />
            <AppointmentCard 
            _id="2"
            start_time={new Date("2023-10-01T10:00:00Z")} 
            additional_data={{ 
                doctor_name:"Docstora 1",
                clinic_name:"Clinica 1",
                room_number:"Cuarto 1",
                paid:true}} 
            />
      </section>
    )    
};

export default UpcomingAppointments;