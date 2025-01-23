export interface Address  {
    street_address: string,
    city: string,
    state: string,
    postal_code: string,
    country_code: string,
    type: string
  }
  
  export interface Phone_Number  {
    number: string,
    type: string
  }
  
  export interface Email_Address  {
    address: string,
    type: string
  }
  
  export interface Provider  {
    name: string,
    remote_id: string,
    type: string,
    display_name: string
  }
  
  export interface Opt_Ins  {
    sms: boolean,
    email: boolean
  }
  
  export interface Patient  {
    type:string;
    remote_id: number;
    given_name: string;
    family_name: string;
    preferred_name: string;
    fullname: string;
    birth_date: string;
    age: number;
    gender: string;
    notes: string;
    addresses: Address[];
    phone_numbers: Phone_Number[];
    primary_phone_number: string;
    email_addresses: Email_Address[];
    primary_email_address: string;
    state: string;
    additional_data: object;
    preferred_provider: Provider;
    insurance: string;
    first_visit: string;
    nextVisit: string;
    lastVisit: string;
    guarantor: string;
    opt_ins: Opt_Ins;
    activeTreatment: boolean;
    create_time: string;
    update_time: string;
  };