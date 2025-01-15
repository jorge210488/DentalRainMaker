"use client";

import { AuthContext } from "@/context/GlobalContext";
import useAppointmentData from "@/hooks/fetchAppointmentData";
import { IAppointment } from "@/interfaces/ComponentsInterfaces/Appointment";
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";

const PatientAppointments = () => {
    // const { appointments } = useAppointmentData();
    // const [userAppointments, setUserAppointments] = useState<IAppointment[]>([]);
    // const {currentUser, token} = useContext(AuthContext);
    // const router = useRouter();

    // useEffect(() => {
    //     const fetchUserAppointments = async () => {
    //         if(!currentUser || !token) return;
    //         try {
               
    //         } catch (error) {
                
    //         }
    // }, [currentUser]);
};

export default PatientAppointments;