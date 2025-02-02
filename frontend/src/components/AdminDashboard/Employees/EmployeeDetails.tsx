import { Employee } from '@/interfaces/ComponentsInterfaces/Employee'
import React from 'react'


type EmployeeDetailsProps = {
    employee: Employee
  }

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ employee }) => (

    <div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

        <div>
          <p>
            <strong>Type:</strong> {employee.type ?? 'null'}
          </p>
          <p>
            <strong>Given Name:</strong> {employee.given_name ?? 'null'}
          </p>
          <p>
            <strong>Family Name:</strong> {employee.family_name ?? 'null'}
          </p>
        </div>

        <div>
          <p>
            <strong>Primary Email Address:</strong>{' '}
            {employee.email ?? 'null'}
          </p>
        </div>

      </div>


    </div>
        
      
      
    )
