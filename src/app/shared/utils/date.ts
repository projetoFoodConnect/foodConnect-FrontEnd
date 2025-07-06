export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

