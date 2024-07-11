import React from "react";
import NumberInput from "../inputs/NumberInput";
import TextInput from "../inputs/TextInput";
import DateInput from "../inputs/DateInput";
import utils from "../../utils";
import DropdownInput from "../inputs/DropdownInput";

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
    <>
      <p className="description">How long will it take to reach my goal?</p>
      <div role="tabpanel" id="target-amount">
        <p>
          If I put
          {/* funding amount */}{" "}
          <NumberInput
            name="Funding Amount"
            step={10}
            numberValue={fundingAmount}
            setNumberValue={setFundingAmount}
          />{" "}
          towards {/* savings goal name */}
          <TextInput
            name="Savings Goal"
            value={savingsGoal}
            setValue={setSavingsGoal}
          />{" "}
          goal
          {/* funding frequency */}
          {" every "}
          <DropdownInput
            name="Funding Frequency"
            value={fundingFrequency}
            onChange={handleFrequencyChange}
            options={["week", "two-weeks", "month"]}
          />{" "}
          starting {/* starting date */}
          <DateInput
            name="Starting Date"
            dateValue={startingDate}
            setDateValue={setStartingDate}
          />
          , I will {/* if it's never */}
          {goalFinishDate === "never" ? (
            <span className="calc-value">never</span>
          ) : (
            ""
          )}
          {/* if it's not never */} reach my goal of
          {/* goal amount */}{" "}
          <NumberInput
            name="Goal Amount"
            step={100}
            numberValue={goalAmount}
            setNumberValue={setGoalAmount}
          />
          {goalFinishDate !== "never" ? " in " : ""}
          {/* amount calculated */}
          {goalFinishDate === "never" ? (
            ""
          ) : timeToReachGoal.months === 1 ? (
            <span className="calc-value">1 month</span>
          ) : (
            <span className="calc-value">{timeToReachGoal.months} months</span>
          )}
          {goalFinishDate !== "never" ? ", on " : ""}
          {goalFinishDate !== "never" ? (
            <span className="calc-value">{goalFinishDate}</span>
          ) : (
            ""
          )}
          .
        </p>
      </div>
    </>
  );
};

export default TargetAmount;
