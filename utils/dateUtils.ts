export const shortFormatDate = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).format(new Date());

export  const currentDay = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(new Date());
