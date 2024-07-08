import React from "react";

const Calculator = () => {
  const [savingsGoal, setSavingsGoal] = React.useState<string>("vacation");
  const [goalAmount, setGoalAmount] = React.useState<number>(1000);
  const [amountSaved, setAmountSaved] = React.useState<number>(0);
  const [fundingFrequency, setFundingFrequency] =
    React.useState<string>("weekly");
  const [amountPerPeriod, setAmountPerPeriod] = React.useState<number>(0);

  // Set the default date to today
  const today: string = new Date().toISOString().split("T")[0];
  const aWeekFromToday: string = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const [targetDate, setTargetDate] = React.useState<string>(today);

  // Get the value of the selected frequency
  const handleFrequencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFundingFrequency(e.target.value);
  };

  // Handle form submission: show results
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Get the amount needed per funding period
    const amountPerPeriod: number = calculateAmountPerPeriod(
      goalAmount,
      calculatePeriods(targetDate, fundingFrequency)
    );

    // Update the state with the amount per period and show the results
    setAmountPerPeriod(amountPerPeriod);
  };

  // Calculate the number of funding periods
  const calculatePeriods = (
    targetDate: string,
    fundingFrequency: string
  ): number => {
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
  const calculateAmountPerPeriod = (
    goalAmount: number,
    periods: number
  ): number => {
    return Math.abs(Math.ceil((goalAmount - amountSaved) / periods));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          With {/* amount already saved */}
          <label>
            $
            <input
              type="number"
              placeholder={amountSaved.toString()}
              min={0}
              step={10}
              onChange={(e) => setAmountSaved(Number(e.target.value))}
            />
          </label>{" "}
          already saved, I need to contribute
          {/* amount calculated */}{" "}
          <span className="calc-value">${amountPerPeriod}</span>
          {/* funding frequency */}{" "}
          <label>
            <select value={fundingFrequency} onChange={handleFrequencyChange}>
              <option value="weekly">every week</option>
              <option value="bi-weekly">every other week</option>
              <option value="monthly">every month</option>
            </select>
          </label>{" "}
          to meet my {/* savings goal name */}
          <label>
            <input
              type="text"
              placeholder={savingsGoal}
              onChange={(e) => setSavingsGoal(e.target.value)}
            />
          </label>{" "}
          goal of {/* goal amount */}
          <label>
            $
            <input
              type="number"
              placeholder={goalAmount.toString()}
              min={100}
              step={100}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
            />
          </label>{" "}
          by {/* goal target date */}
          <label>
            <input
              type="date"
              value={aWeekFromToday}
              onChange={(e) => setTargetDate(e.target.value)}
              // set the minimum attribute to a week from today
              min={aWeekFromToday}
            />
          </label>
          .
        </p>
        <button type="submit" className="btn">
          Calculate
        </button>
      </form>
    </>
  );
};

export default Calculator;
