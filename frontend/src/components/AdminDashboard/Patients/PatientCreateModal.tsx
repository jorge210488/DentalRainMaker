import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

type PatientCreateModalProps = { 
  onCreatePatient: () => void;
  closeCreateModal: () => void;
};

export const PatientCreateModal: React.FC<PatientCreateModalProps> = ({ onCreatePatient, closeCreateModal }) => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const { data: session } = useSession();

  const onSubmit = async (data: any) => {
    // Handle patient creation
    const realData = {
        given_name:data.given_name,
        family_name:data.family_name,
        email_addresses: [{address:data.email, type:"OTHER"}],
      };
  
      try {
        if(session?.user?.clinicId){
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/contacts?clinicId=${encodeURIComponent(session.user.clinicId)}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user.token}`,
              },
              body: JSON.stringify(realData),
            }
          );
    
          const result = await response.json();
    
          if (response.status === 201) {
            Swal.fire({
              title: "Success",
              text: "The patient has been created successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
            // Activa la actualización de la lista de pacientes
            onCreatePatient();
            reset();
            closeCreateModal();
          } else {
            Swal.fire({
              title: "Error",
              text: result.message || "An error occurred while creating the patient.",
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
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={closeCreateModal}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Create New Patient</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="familyName" className="block font-medium">Family Name</label>
            <input
              id="familyName"
              className="w-full rounded border p-2"
              {...register("family_name", { required: "Family name is required" })}
            />
            {errors.family_name && <p className="text-sm text-red-500">{String(errors.family_name.message)}</p>}
          </div>
          <div>
            <label htmlFor="givenName" className="block font-medium">Given Name</label>
            <input
              id="givenName"
              className="w-full rounded border p-2"
              {...register("given_name", { required: "Given name is required" })}
            />
            {errors.given_name && <p className="text-sm text-red-500">{String(errors.given_name.message)}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              id="email"
              type="email"
              className="w-full rounded border p-2"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-sm text-red-500">{String(errors.email.message)}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Patient
          </button>
        </form>
      </div>
    </div>
  );
};
