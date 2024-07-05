import React from "react";
import Results from "./Results";

const Calculator = () => {
  const [showResults, setShowResults] = React.useState<boolean>(false);
  const [savingsGoal, setSavingsGoal] = React.useState<string>("");
  const [goalAmount, setGoalAmount] = React.useState<number>(0);
  const [amountSaved, setAmountSaved] = React.useState<number>(0);
  const [fundingFrequency, setFundingFrequency] = React.useState<string>("weekly");
  const [amountPerPeriod, setAmountPerPeriod] = React.useState<number>(0);

  // Set the default date to today
  const today: string = new Date().toISOString().split("T")[0];
  const [targetDate, setTargetDate] = React.useState<string>(today);

  // Get the value of the selected frequency
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFundingFrequency(e.target.value);
  };

  // Handle form submission: show results
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get the amount needed per funding period
    const amountPerPeriod: number = calculateAmountPerPeriod(goalAmount, calculatePeriods(targetDate, fundingFrequency));

    // Update the state with the amount per period and show the results
    setAmountPerPeriod(amountPerPeriod);
    setShowResults(true);
  }

  // Calculate the number of funding periods
  const calculatePeriods = (targetDate: string, fundingFrequency: string) => {
    const today: Date = new Date();
    const target: Date = new Date(targetDate);
    const difference: number = target.getTime() - today.getTime();
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
  const calculateAmountPerPeriod = (goalAmount: number, periods: number) => {
    return Math.ceil(goalAmount / periods);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>What are you saving for?</span>
          <input
            type="text"
            value={savingsGoal}
            onChange={(e) => setSavingsGoal(e.target.value)}
          />
        </label>
        <label>
          <span>How much do you need?</span>
          <input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
          />
        </label>
        <label>
          <span>How much do you have already?</span>
          <input type="number" value={amountSaved} onChange={(e) => setAmountSaved(Number(e.target.value))} />
        </label>
        <label>
          <span>How often do you want to fund this goal?</span>
          <select value={fundingFrequency} onChange={handleFrequencyChange}>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label>
          <span>What's your target date?</span>
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} min={today} />
        </label>
        <button type="submit">Calculate</button>
      </form>
      
      {showResults && (
        <Results
          goalAmount={goalAmount}
          fundingFrequency={fundingFrequency}
          savingsGoal={savingsGoal}
          targetDate={targetDate}
          amountSaved={amountSaved}
          amountPerPeriod={amountPerPeriod}
        />
      )}
    </>
  );
};

export default Calculator;