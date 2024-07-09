import React from "react";

type TargetAmountProps = {
  startingDate: string;
  setStartingDate: (date: string) => void;
  fundingFrequency: string;
  handleFrequencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const TargetAmount = ({
  startingDate,
  setStartingDate,
  fundingFrequency,
  handleFrequencyChange,
}: TargetAmountProps) => {
  const [goalAmount, setGoalAmount] = React.useState<number>(1000);
  const [fundingAmount, setFundingAmount] = React.useState<number>(25);
  const [savingsGoal, setSavingsGoal] = React.useState<string>("my vacation");

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
            min={5}
            placeholder={fundingAmount.toString()}
            onChange={(e) => setFundingAmount(Number(e.target.value))}
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
        <span className="calc-value">10 months</span>, by{" "}
        <span className="calc-value">2022-12-01</span>.
      </p>
    </div>
  );
};

export default TargetAmount;
