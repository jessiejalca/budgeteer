// Calculate the number of funding periods based on a funding frequency, start date, and target date
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
    case "week":
      periods = difference / (1000 * 60 * 60 * 24 * 7);
      break;
    case "two-weeks":
      periods = difference / (1000 * 60 * 60 * 24 * 14);
      break;
    case "month":
      periods = difference / (1000 * 60 * 60 * 24 * 30);
      break;
    default:
      break;
  }

  // Use Math.floor to round down so that the user meets their goal before the target date
  return Math.floor(periods);
};

// Calculate the amount needed per funding period based on a goal amount, amount saved, and number of periods
const calculateAmountPerPeriod = (
  goalAmount: number,
  amountSaved: number,
  periods: number
): number => {
  return Math.abs(Math.ceil((goalAmount - amountSaved) / periods));
};

// Calculate how many times the funding plan will have to run to reach the goal based on a funding and goal amount
const calculateNumberOfRuns = (
  fundingAmount: number,
  goalAmount: number
): number => {
  return Math.ceil(goalAmount / fundingAmount);
};

// Calculate the goal completion date based on a starting date, funding frequency and number of periods
const calculateGoalFinishDate = (
  startingDate: string,
  periods: number,
  fundingFrequency: string
): string => {
  if (periods === Infinity) return "never";

  const start: Date = new Date(startingDate);
  const target: Date = new Date(start);

  switch (fundingFrequency) {
    case "week":
      target.setDate(start.getDate() + periods * 7);
      break;
    case "two-weeks":
      target.setDate(start.getDate() + periods * 14);
      break;
    case "month":
      target.setMonth(start.getMonth() + periods);
      break;
  }

  return target.toISOString().split("T")[0];
};

// Calculate the number of weeks, months, and years between two dates
const calculateTimeBetweenDates = (
  startDate: string,
  endDate: string
): { weeks: number; months: number; years: number } => {
  const start: Date = new Date(startDate);
  const end: Date = new Date(endDate);
  const difference: number = end.getTime() - start.getTime();
  const weeks: number = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
  const months: number = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
  const years: number = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));

  return { weeks, months, years };
};

export default {
  calculatePeriods,
  calculateAmountPerPeriod,
  calculateNumberOfRuns,
  calculateGoalFinishDate,
  calculateTimeBetweenDates,
};
