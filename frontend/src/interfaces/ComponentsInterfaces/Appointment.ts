interface Provider {
    name: string;
    remote_id: string;
    type: string;
    display_name: string;
}

interface Resource {
    name: string;
    remote_id: string;
    type: string;
    display_name: string;
}
//HAY QUE CAMBIAR ESTA INTERFACE PARA QUE SEA PROPIA DE LA RESPUESTA DEL BACKEND Y USARLA EN EL FRONTEND
export interface IAppointment {
    name: string;
    remote_id: string;
    contact_id: string;
    contact: {
        name: string;
        remote_id: string;
        given_name: string;
        family_name: string;
    };
    location?: string;
    start_time:string;
    end_time?:string;
    wall_start_time?:string;
    wall_end_time?:string;
    time_zone?:string;
    providers?: Provider[];
    scheduler?:{
        name:string;
        remote_id:string;
        type:string;
        display_name:string;
    };
    appointment_type_id:string;
    operatory?:string;
    resources?:Resource[];
    short_description?:string;
    notes?:string;
    confirmed?:boolean;
    cancelled?:boolean;
    completed?:boolean;
    broken?:boolean;
    additional_data?: {};  
    create_time?:string;
    update_time?:string;
    
}
