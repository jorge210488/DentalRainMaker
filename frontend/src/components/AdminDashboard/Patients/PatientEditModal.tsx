import React, { useState } from 'react';
import { Patient } from '@/interfaces/ComponentsInterfaces/Patient';

type PatientEditModalProps = {
  patient: Patient;
  closeEditModal: () => void;
  onUpdatePatient: (updatedPatient: Patient) => void;
};

export const PatientEditModal: React.FC<PatientEditModalProps> = ({ patient, closeEditModal, onUpdatePatient }) => {
  const [formData, setFormData] = useState(patient);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Aquí puedes integrar la lógica para enviar los datos actualizados al backend.
    onUpdatePatient(formData); // Llama a la función para actualizar el paciente.
    closeEditModal(); // Cierra el modal.
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
              <input
                type="text"
                name="gender"
                value={formData.gender || ''}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
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
            <label>
              <strong>Notes:</strong>
              <textarea
                name="notes"
                value={formData.notes || ''}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </label>
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
