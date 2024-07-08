// Calculate the number of funding periods
const calculatePeriods = (
  startDate: string,
  targetDate: string,
  fundingFrequency: string
): number => {
  const start: Date = new Date(startDate);
  const target: Date = new Date(targetDate);
  const difference: number = target.getTime() - start.getTime();
  let periods: number = 0;

  // Calculate the number of periods based on the funding frequency
  switch (fundingFrequency) {
    case "weekly":
      periods = difference / (1000 * 60 * 60 * 24 * 7);
      break;
    case "bi-weekly":
      periods = difference / (1000 * 60 * 60 * 24 * 14);
      break;
    case "monthly":
      periods = difference / (1000 * 60 * 60 * 24 * 30);
      break;
    default:
      break;
  }

  // Use Math.floor to round down so that the user meets their goal before the target date
  return Math.floor(periods);
};

// Calculate the amount needed per funding period
const calculateAmountPerPeriod = (
  goalAmount: number,
  amountSaved: number,
  periods: number
): number => {
  return Math.abs(Math.ceil((goalAmount - amountSaved) / periods));
};

export default {
  calculatePeriods,
  calculateAmountPerPeriod,
};
