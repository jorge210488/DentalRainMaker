export const getDayOfWeek = (dateString: string): string => {
    // Crear un objeto Date a partir del string
    const date = new Date(dateString);
  
    // Array de nombres de días de la semana
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    // Obtener el día de la semana (0-6) y mapear al nombre correspondiente
    return daysOfWeek[date.getDay()];
  };