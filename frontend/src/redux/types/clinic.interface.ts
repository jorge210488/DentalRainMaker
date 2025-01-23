export interface Clinic {
  _id: string
  clinic_name: string
  clinic_website?: string
}

export interface ClinicsState {
  clinics: Clinic[]
  selectedClinicId: string | null
}
