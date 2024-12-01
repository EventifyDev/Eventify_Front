export const formatDate = (date: Date | string): string => {
  try {
    const dateObject = typeof date === 'string' ? new Date(date) : date;

    return dateObject.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'Date non disponible';
  }
};