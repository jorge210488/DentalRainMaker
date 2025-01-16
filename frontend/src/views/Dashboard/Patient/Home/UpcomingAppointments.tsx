'use client'

import React,{ useEffect, useState} from 'react';
import { useSession } from 'next-auth/react';
import AppointmentCard from '@/components/MainComponents/AppointmentCard/AppointmentCard';
import { stat } from 'fs';
import { getUserAppointments } from '@/server/User/getUserAppointments';
import { IAppointment } from '@/interfaces/ComponentsInterfaces/Appointment';
import { set } from 'react-hook-form';

const UpcomingAppointments: React.FC = () => {
    const { data: session, status } = useSession();
    const [ userAppointments, setUserAppointments ] = useState<IAppointment[]>([]);
    
    useEffect(() => {
        const fetchUserAppointments = async () => {
            if(status !== 'authenticated') return;
            try {
                if (session?.user?.userId && session?.user?.token) {
                    const response = await getUserAppointments(session.user.userId, session.user.token);
                    setUserAppointments(response);
                }
            } catch (error) {
                console.error("Error fetching user appointments:", error);
            }
        }
        fetchUserAppointments();
    }, [session, status]);

    if (userAppointments.length === 0) {
        return (
            <section className="mt-8 space-y-4 w-full">
                <h3 className="text-xl font-semibold mb-4">Your upcoming appointments</h3>
                <p>You have no upcoming appointments</p>
            </section>
        )
    }

    return (
        <section className="mt-8 space-y-4 w-full">
          <h3 className="text-xl font-semibold mb-4">Your upcoming appointments</h3>
            {userAppointments.map((appointment) => (
                <AppointmentCard
                _id={appointment._id}
                start_time={new Date(appointment.start_time)}
                additional_data={{
                    doctor_name: appointment.additional_data.doctor_name,
                    clinic_name: appointment.additional_data.clinic_name,
                    paid: appointment.additional_data.paid,
                }}
                />
            ))}
          {/* <AppointmentCard
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
            /> */}
      </section>
    )    
};

export default UpcomingAppointments;