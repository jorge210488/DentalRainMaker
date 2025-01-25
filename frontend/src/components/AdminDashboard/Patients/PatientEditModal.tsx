import React, { useState } from 'react';
import { Patient } from '@/interfaces/ComponentsInterfaces/Patient';
import { useSession } from 'next-auth/react';
import { updateContact } from '@/server/contacts';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

type PatientEditModalProps = {
  patient: Patient;
  closeEditModal: () => void;
  onUpdatePatient: (updatedPatient: Patient) => void;
};

export const PatientEditModal: React.FC<PatientEditModalProps> = ({ patient, closeEditModal, onUpdatePatient }) => {
  const [formData, setFormData] = useState(patient);
  const { data: session } = useSession();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (index: number, field: string, value: string) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const handlePhoneNumberChange = (index: number, field: string, value: string) => {
    const updatedPhoneNumbers = [...formData.phone_numbers];
    updatedPhoneNumbers[index] = { ...updatedPhoneNumbers[index], [field]: value };
    setFormData({ ...formData, phone_numbers: updatedPhoneNumbers });
  };

  const handleEmailChange = (index: number, field: string, value: string) => {
    const updatedEmails = [...formData.email_addresses];
    updatedEmails[index] = {...updatedEmails[index], [field]:value };
    setFormData({...formData, email_addresses: updatedEmails});
  };
  
  

  
  const handleSubmit = async() => {
    // Aquí puedes integrar la lógica para enviar los datos actualizados al backend.
    try {
            
      const newData: Partial<Patient> = {};

        if (formData.preferred_name) newData.preferred_name = formData.preferred_name;
        if (formData.gender) newData.gender = formData.gender;
        if (formData.birth_date) newData.birth_date = formData.birth_date;
        if (formData.addresses.length > 0) newData.addresses = formData.addresses;
        if (formData.phone_numbers.length > 0) newData.phone_numbers = formData.phone_numbers;
        if (formData.given_name) newData.given_name = formData.given_name;
        if (formData.family_name) newData.family_name = formData.family_name;
        if (formData.email_addresses.length > 0) newData.email_addresses = formData.email_addresses;
        
      console.log('esta es mi data para editar',newData);
      
      if(session?.user.clinicId && session.user.token){
          const response = await updateContact(
          session.user.clinicId,
          patient.remote_id.toString(),
          session.user.token,
          newData
        )
        
        if (response) {
          Swal.fire({
            title: "Success",
            text: "The patient has been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          onUpdatePatient(formData); // Llama a la función para actualizar el paciente.
          closeEditModal(); // Cierra el modal.


        } else {
          Swal.fire({
            title: "Error",
            text: "An error occurred while creating the patient.",
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }

        
        
      }
    } catch (error) {
      Swal.fire({
        title: "Connection Error",
        text: "Failed to connect to the server. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-h-screen w-full max-w-4xl shadow-lg relative overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={closeEditModal}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Patient</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>
              <strong>Given Name:</strong>
              <input
                type="text"
                name="given_name"
                value={formData.given_name || ''}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </label>
            <label>
              <strong>Family Name:</strong>
              <input
                type="text"
                name="family_name"
                value={formData.family_name || ''}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </label>
            <label>
              <strong>Preferred Name:</strong>
              <input
                type="text"
                name="preferred_name"
                value={formData.preferred_name || ''}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </label>

            <label>
              <strong>Gender:</strong>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </label>

            <label>
              <strong>Birth Date:</strong>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date || ''}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </label>
          </div>  
        

          <div>
            <h3 className="text-xl font-bold mb-2">Addresses</h3>
              <div  className="mb-4 border p-2 rounded">
                <label>
                  <strong>Street Address:</strong>
                  <input
                    type="text"
                    value={formData.addresses[0]?.street_address || ""}
                    onChange={(e) =>
                      handleAddressChange(0, "street_address", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </label>
                <label>
                  <strong>City:</strong>
                  <input
                    type="text"
                    value={formData.addresses[0]?.city || ""}
                    onChange={(e) => handleAddressChange(0, "city", e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </label>
                <label>
                  <strong>State:</strong>
                  <input
                    type="text"
                    value={formData.addresses[0]?.state || ""}
                    onChange={(e) => handleAddressChange(0, "state", e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </label>
                <label>
                  <strong>Postal Code:</strong>
                  <input
                    type="text"
                    value={formData.addresses[0]?.postal_code || ""}
                    onChange={(e) =>
                      handleAddressChange(0, "postal_code", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </label>
                <label>
                  <strong>Country Code:</strong>
                  <input
                    type="text"
                    value={formData.addresses[0]?.country_code || ""}
                    onChange={(e) =>
                      handleAddressChange(0, "country_code", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </label>
                <label>
                  <strong>Type:</strong>
                  <select
                    value={formData.addresses[0]?.type || "SELECT"}
                    onChange={(e) => handleAddressChange(0, "type", e.target.value)}
                    className="w-full border rounded p-2"
                  >
                    <option value="SELECT">Select a type</option>
                    <option value="HOME">Home</option>
                    <option value="WORK">Work</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>
                
              </div>
          </div>


          <div>
            <h3 className="text-xl font-bold mb-2">Phone Numbers</h3>
              <div  className="mb-4 border p-2 rounded">
                <label>
                  <strong>Phone Number:</strong>
                  <input
                    type="text"
                    value={formData.phone_numbers[0]?.number || ""}
                    onChange={(e) =>
                      handlePhoneNumberChange(0, "number", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </label>
                <label>
                  <strong>Type:</strong>
                  <select
                    value={formData.phone_numbers[0]?.type || "SELECT"}
                    onChange={(e) =>
                      handlePhoneNumberChange(0, "type", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  >
                    <option value="SELECT">Select a type</option>
                    <option value="MOBILE">Mobile</option>
                    <option value="HOME">Home</option>
                    <option value="WORK">Work</option>
                  </select>
                </label>
              </div>
          </div>


          <div>
            <h3 className="text-xl font-bold mb-2">Email Address</h3>
            
              <div  className="mb-4 border p-2 rounded">
                <label>
                  <strong>Email Address:</strong>
                  <input
                    type="text"
                    value={formData.email_addresses[0]?.address || ""}
                    onChange={(e) =>
                      handleEmailChange(0, "address", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  />
                </label>
                <label>
                  <strong>Type:</strong>
                  <select
                    value={formData.email_addresses[0]?.type || "SELECT"}
                    onChange={(e) =>
                      handleEmailChange(0, "type", e.target.value)
                    }
                    className="w-full border rounded p-2"
                  >
                    <option value="SELECT">Select a type</option>
                    <option value="HOME">Home</option>
                    <option value="WORK">Work</option>
                  </select>
                </label>
                
              </div>
            
          </div>
        
      </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
        <button
          className="mt-4 ml-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          onClick={closeEditModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
