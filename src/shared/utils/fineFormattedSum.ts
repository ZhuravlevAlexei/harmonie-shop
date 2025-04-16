export const fineFormattedSum = (sum: number): string => {
  const formatted = new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(sum);

  return formatted;
};
