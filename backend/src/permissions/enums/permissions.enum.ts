export enum Permission {
  // Permisos para Users
  READ_ALL_USERS = 'READ_ALL_USERS',
  READ_OWN_USER = 'READ_OWN_USER',
  UPDATE_USER = 'UPDATE_USER',
  SOFT_DELETE_USER = 'SOFT_DELETE_USER',
  DELETE_USER = 'DELETE_USER',

  // Permisos para Appointments
  CREATE_APPOINTMENT = 'CREATE_APPOINTMENT',
  READ_ALL_APPOINTMENTS = 'READ_ALL_APPOINTMENTS',
  READ_OWN_APPOINTMENT = 'READ_OWN_APPOINTMENT',
  UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT',
  SOFT_DELETE_APPOINTMENT = 'SOFT_DELETE_APPOINTMENT',
  DELETE_APPOINTMENT = 'DELETE_APPOINTMENT',

  // Permisos Administrativos
  ALL_ACCESS = 'ALL_ACCESS',
  MANAGE_PERMISSIONS = 'MANAGE_PERMISSIONS',
  BAN_USER = 'BAN_USER',
}
