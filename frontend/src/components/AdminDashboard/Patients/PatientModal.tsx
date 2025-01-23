'use-client'
import React, { useState } from 'react';
import { Patient } from '@/interfaces/ComponentsInterfaces/Patient';
import { PatientEditModal } from './PatientEditModal';

type PatientModalProps = {
  patient: Patient;
  closePatientModal: () => void;
};

export const PatientModal: React.FC<PatientModalProps> = ({ patient, closePatientModal }) => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleUpdatePatient = (updatedPatient: Patient) => {
    console.log('Updated Patient:', updatedPatient);
    // Aquí puedes añadir lógica para actualizar el estado o realizar una petición al backend.
  };

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-h-screen w-full max-w-4xl shadow-lg relative overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={closePatientModal}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Patient Details</h2>

        {/* Display patient details here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Type:</strong> {patient.type ?? "null"}</p>
                  <p><strong>Given Name:</strong> {patient.given_name ?? "null"}</p>
                  <p><strong>Family Name:</strong> {patient.family_name ?? "null"}</p>
                  <p><strong>Preferred Name:</strong> {patient.preferred_name ?? "null"}</p>
                  <p><strong>Gender:</strong> {patient.gender ?? "null"}</p>
                  <p><strong>Birth Date:</strong> {patient.birth_date ?? "null"}</p>
                  <p><strong>Notes:</strong> {patient.notes ?? "null"}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold">Addresses</h3>
                  {patient.addresses?.length > 0 ? (
                    patient.addresses.map((address, index) => (
                      <div key={index} className="mb-2">
                        <p><strong>Type:</strong> {address.type ?? "null"}</p>
                        <p><strong>Street:</strong> {address.street_address ?? "null"}</p>
                        <p><strong>City:</strong> {address.city ?? "null"}</p>
                        <p><strong>State:</strong> {address.state ?? "null"}</p>
                        <p><strong>Postal Code:</strong> {address.postal_code ?? "null"}</p>
                        <p><strong>Country Code:</strong> {address.country_code ?? "null"}</p>
                      </div>
                    ))
                  ) : (
                    <p>No addresses available.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold">Phone Numbers</h3>
                  {patient.phone_numbers?.length > 0 ? (
                    patient.phone_numbers.map((phone, index) => (
                      <div key={index} className="mb-2">
                        <p><strong>Type:</strong> {phone.type ?? "null"}</p>
                        <p><strong>Number:</strong> {phone.number ?? "null"}</p>
                      </div>
                    ))
                  ) : (
                    <p>No phone numbers available.</p>
                  )}
                  <p><strong>Primary Phone Number:</strong> {patient.primary_phone_number ?? "null"}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold">Email Addresses</h3>
                  {patient.email_addresses?.length > 0 ? (
                    patient.email_addresses.map((email, index) => (
                      <div key={index} className="mb-2">
                        <p><strong>Type:</strong> {email.type ?? "null"}</p>
                        <p><strong>Address:</strong> {email.address ?? "null"}</p>
                      </div>
                    ))
                  ) : (
                    <p>No email addresses available.</p>
                  )}
                  <p><strong>Primary Email Address:</strong> {patient.primary_email_address ?? "null"}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold">Additional Data</h3>
                  {patient.additional_data ? (
                    Object.entries(patient.additional_data).map(([key, value], index) => (
                      <p key={index}><strong>{key}:</strong> {value ?? "null"}</p>
                    ))
                  ) : (
                    <p>No additional data available.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold">Preferred Provider</h3>
                  {patient.preferred_provider ? (
                    <>
                      <p><strong>Name:</strong> {patient.preferred_provider.name ?? "null"}</p>
                      <p><strong>Remote ID:</strong> {patient.preferred_provider.remote_id ?? "null"}</p>
                      <p><strong>Type:</strong> {patient.preferred_provider.type ?? "null"}</p>
                      <p><strong>Display Name:</strong> {patient.preferred_provider.display_name ?? "null"}</p>
                    </>
                  ) : (
                    <p>No preferred provider information available.</p>
                  )}
                  <p><strong>First Visit:</strong> {patient.first_visit ?? "null"}</p>
                  <p><strong>Guarantor:</strong> {patient.guarantor ?? "null"}</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mt-4">Opt-Ins</h3>
              <p><strong>SMS:</strong> {patient.opt_ins?.sms ? "Yes" : "No"}</p>
              <p><strong>Email:</strong> {patient.opt_ins?.email ? "Yes" : "No"}</p>

              <p><strong>Create Time:</strong> {patient.create_time ?? "null"}</p>
              <p><strong>Update Time:</strong> {patient.update_time ?? "null"}</p>

              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={closePatientModal}
              >
                Close
              </button>

              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleOpenEditModal}
              >
                Edit
              </button>              

      </div>
    </div>

    {isEditModalOpen && (
      <PatientEditModal
        patient={patient}
        closeEditModal={handleCloseEditModal}
        onUpdatePatient={handleUpdatePatient}
      />
    )}
    </>
  );
};
