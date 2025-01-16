"use client";
import React from 'react';

interface AppointmentCardProps {
    _id: string;
    start_time: Date;
    additional_data: {
        doctor_name:string;
        clinic_name:string;
        room_number:string;
        paid:boolean;
    };  
  }

const AppointmentCard: React.FC <AppointmentCardProps>= ({
    _id,
    start_time,
    additional_data
}) => {

    return(
        
        
        <div
            key={_id}
            className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md" 
        >
            <div>
                <p 
                    className={`text-sm ${
                        additional_data.paid ? "text-green-500" : "text-red-500"
                    }`}>
                    {additional_data.paid ? "paid" : "pending payment"}
                </p>
                <h4 className="text-lg font-bold">{additional_data.doctor_name}</h4>
                <p className="text-sm text-gray-600">{start_time.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{additional_data.clinic_name}</p>
                <p className="text-sm text-gray-600">{additional_data.room_number}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
                {/* <button className="text-green-600 hover:underline">Reschedule</button>
                <button className="text-red-600 hover:underline">Cancel</button> */}
                {!additional_data.paid && (
                    <button className="rounded-lg border border-green-600 px-4 py-1 text-green-600 hover:bg-green-100">
                    Pay
                    </button>
                )}   
            </div>
        </div>
        
        
    )
}

export default AppointmentCard;