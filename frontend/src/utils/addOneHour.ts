export const addOneHour = (timeString: string): string => {
    // Dividir el tiempo en horas, minutos y segundos
    const [hours, minutes, seconds] = timeString.split(':').map(Number);   
  
    // Crear un objeto Date y establecer las horas, minutos y segundos
    const date = new Date();
    date.setHours(hours, minutes, seconds);
  
    // Sumar 1 hora
    date.setHours(date.getHours() + 1);   
  
    // Formatear el resultado en hh:mm:ss
    const updatedHours = String(date.getHours()).padStart(2, '0');
    const updatedMinutes = String(date.getMinutes()).padStart(2, '0');
    const updatedSeconds = String(date.getSeconds()).padStart(2, '0');
     
    return `${updatedHours}:${updatedMinutes}:${updatedSeconds}`;
  };