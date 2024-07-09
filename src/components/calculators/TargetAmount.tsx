import React from "react";
import utils from "../../utils";

type TargetAmountProps = {
  startingDate: string;
  setStartingDate: (date: string) => void;
  fundingFrequency: string;
  handleFrequencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

type TimePeriod = { weeks: number; months: number; years: number };

const TargetAmount = ({
  startingDate,
  setStartingDate,
  fundingFrequency,
  handleFrequencyChange,
}: TargetAmountProps) => {
  const [goalAmount, setGoalAmount] = React.useState<number>(1000);
  const [fundingAmount, setFundingAmount] = React.useState<number>(25);
  const [savingsGoal, setSavingsGoal] = React.useState<string>("my vacation");
  const [goalFinishDate, setGoalFinishDate] = React.useState<string>(
    utils.calculateGoalFinishDate(
      startingDate,
      utils.calculateNumberOfRuns(fundingAmount, goalAmount),
      fundingFrequency
    )
  );
  const [timeToReachGoal, setTimeToReachGoal] = React.useState<TimePeriod>(
    utils.calculateTimeBetweenDates(startingDate, goalFinishDate)
  );

  // Calculate the new goal completion date and the time to reach the goal as the user changes the values
  React.useEffect(() => {
    // Calculate the number of periods based on the current state
    const periods: number = utils.calculateNumberOfRuns(
      fundingAmount,
      goalAmount
    );

    // Calculate the new goal completion date based on the current state
    const newGoalFinishDate: string = utils.calculateGoalFinishDate(
      startingDate,
      periods,
      fundingFrequency
    );

    // Calculate time to reach goal
    const newTimeToReachGoal: TimePeriod = utils.calculateTimeBetweenDates(
      startingDate,
      newGoalFinishDate
    );

    // Update the goalAmount state
    setTimeToReachGoal(newTimeToReachGoal);
    setGoalFinishDate(newGoalFinishDate);
  }, [fundingAmount, goalAmount, fundingFrequency, startingDate]);

  return (
    <div role="tabpanel" id="target-amount">
      <p>
        If I put
        {/* funding amount */}{" "}
        <label>
          $
          <input
            name="funding-amount"
            type="number"
            min={10}
            step={10}
            placeholder={fundingAmount.toString()}
            onChange={(e) => setFundingAmount(Number(e.target.value) || 1)}
          />
        </label>{" "}
        towards {/* savings goal name */}
        <label id="savings-goal" title="Savings Goal">
          <input
            name="savings-goal"
            type="text"
            placeholder={savingsGoal}
            onChange={(e) => setSavingsGoal(e.target.value)}
          />
        </label>{" "}
        goal
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
        </label>
        , I will reach my goal of
        {/* goal amount */}{" "}
        <label id="goal-amount" title="Goal Amount">
          $
          <input
            name="goal-amount"
            type="number"
            min={100}
            placeholder={goalAmount.toString()}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
          />
        </label>{" "}
        in {/* amount calculated */}
        <span className="calc-value">{timeToReachGoal.months} months</span>, on{" "}
        <span className="calc-value">{goalFinishDate}</span>.
      </p>
    </div>
  );
};

export default TargetAmount;
