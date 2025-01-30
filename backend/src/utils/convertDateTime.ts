export function convertDateTime(fechaISO: string, zonaHoraria: string = "UTC"): { date: string, time: string } {
    const fecha = new Date(fechaISO);

    // Opciones de formato con zona horaria
    const opcionesFecha: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit", timeZone: zonaHoraria };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: zonaHoraria };

    // Formatear la fecha y hora
    const date = new Intl.DateTimeFormat("en-CA", opcionesFecha).format(fecha).replace(/\//g, "-");
    const time = new Intl.DateTimeFormat("en-GB", opcionesHora).format(fecha);

    return { date, time };
}



