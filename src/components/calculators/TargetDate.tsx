import React from "react";
import utils from "../../utils";

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
  const [savingsGoal, setSavingsGoal] = React.useState<string>("my vacation");
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
    <div aria-label="Target Date Calculator" role="tabpanel" id="target-date">
      <p>
        With {/* amount already saved */}
        <label id="amount-saved" title="Amount Saved">
          $
          <input
            name="amount-saved"
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
        <label id="funding-frequency" title="Funding Frequency">
          <select
            name="funding-frequency"
            value={fundingFrequency}
            onChange={handleFrequencyChange}
          >
            <option value="weekly">every week</option>
            <option value="bi-weekly">every other week</option>
            <option value="monthly">every month</option>
          </select>
        </label>{" "}
        starting {/* starting date */}
        <label id="starting-date" title="Starting Date">
          <input
            name="starting-date"
            type="date"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
          />
        </label>{" "}
        to meet my goal of {/* goal amount */}
        <label id="goal-amount" title="Goal Amount">
          $
          <input
            name="goal-amount"
            type="number"
            min={100}
            step={100}
            placeholder={goalAmount.toString()}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
          />
        </label>{" "}
        for {/* savings goal name */}
        <label id="savings-goal" title="Savings Goal">
          <input
            name="savings-goal"
            type="text"
            placeholder={savingsGoal}
            onChange={(e) => setSavingsGoal(e.target.value)}
          />
        </label>{" "}
        by {/* goal target date */}
        <label id="goal-target-date" title="Goal Target Date">
          <input
            name="goal-target-date"
            type="date"
            min={aMonthFromToday}
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </label>
        .
      </p>
    </div>
  );
};

export default TargetDate;
