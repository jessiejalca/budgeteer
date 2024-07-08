import React from "react";
import utils from "../utils";

type TargetDateProps = {
  startingDate: string;
  setStartingDate: (date: string) => void;
  fundingFrequency: string;
  handleFrequencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TargetDate = ({
  startingDate,
  setStartingDate,
  fundingFrequency,
  handleFrequencyChange,
}: TargetDateProps) => {
  const [savingsGoal, setSavingsGoal] = React.useState<string>("vacation");
  const [goalAmount, setGoalAmount] = React.useState<number>(1000);
  const [amountSaved, setAmountSaved] = React.useState<number>(0);
  const [amountPerPeriod, setAmountPerPeriod] = React.useState<number>(0);

  // Set the default target date to a month from today
  const aMonthFromToday: string = new Date(
    new Date().setMonth(new Date().getMonth() + 1)
  )
    .toISOString()
    .split("T")[0];
  const [targetDate, setTargetDate] = React.useState<string>(aMonthFromToday);

  // Calculate the new amount per period as the user changes the values
  React.useEffect(() => {
    // Calculate the new amount per period based on the current state
    const newAmountPerPeriod = utils.calculateAmountPerPeriod(
      goalAmount,
      amountSaved,
      utils.calculatePeriods(startingDate, targetDate, fundingFrequency)
    );

    // Update the amountPerPeriod state
    setAmountPerPeriod(newAmountPerPeriod);
  }, [goalAmount, amountSaved, fundingFrequency, startingDate, targetDate]); // Dependencies

  return (
    <p>
      With {/* amount already saved */}
      <label>
        $
        <input
          type="number"
          placeholder={amountSaved.toString()}
          min={0}
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
      starting {/* starting date */}
      <label>
        <input
          type="date"
          value={startingDate}
          onChange={(e) => setStartingDate(e.target.value)}
        />
      </label>{" "}
      to meet my goal of {/* goal amount */}
      <label>
        $
        <input
          type="number"
          min={100}
          placeholder={goalAmount.toString()}
          onChange={(e) => setGoalAmount(Number(e.target.value))}
        />
      </label>{" "}
      for {/* savings goal name */}
      <label>
        <input
          type="text"
          placeholder={savingsGoal}
          onChange={(e) => setSavingsGoal(e.target.value)}
        />
      </label>{" "}
      by {/* goal target date */}
      <label>
        <input
          type="date"
          min={aMonthFromToday}
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
      </label>
      .
    </p>
  );
};

export default TargetDate;
