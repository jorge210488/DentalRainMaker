export interface IAppointment {
    _id: string;
    name: string;
    contact_id: string;
    location: string;
    start_time:Date;
    end_time:Date
    appointment_type_id:string;
    short_description?:string;
    notes?:string;
    confirmed?:boolean;
    cancelled?:boolean;
    completed?:boolean;
    broken?:boolean;
    doctor_id:string;
    clinic_id:string;
    providers?:Array<string>;
    scheduler?:Array<string>;
}