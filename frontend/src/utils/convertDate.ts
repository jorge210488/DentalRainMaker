export const convertDate = (dateString: string): string => {
    // Crear un objeto Date a partir del string
    const date = new Date(dateString);
  
    // Extraer el año, mes y día
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso se suma 1
    const day = String(date.getDate()).padStart(2, '0');
  
    // Formatear en yyyy-mm-dd
    return `${year}-${month}-${day}`;
  };