import React from "react";
import NumberInput from "../inputs/NumberInput";
import TextInput from "../inputs/TextInput";
import DateInput from "../inputs/DateInput";
import utils from "../../utils";
import DropdownInput from "../inputs/DropdownInput";

type GenerateDateProps = {
  startingDate: string;
  setStartingDate: (date: string) => void;
  fundingFrequency: string;
  handleFrequencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

type TimePeriod = { weeks: number; months: number; years: number };

const GenerateDate = ({
  startingDate,
  setStartingDate,
  fundingFrequency,
  handleFrequencyChange,
}: GenerateDateProps) => {
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
  const [strGoalFinishDate, setStrGoalFinishDate] = React.useState<string>(
    utils.formatter.format(new Date(goalFinishDate))
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
    setStrGoalFinishDate(utils.formatter.format(new Date(goalFinishDate)));
  }, [
    fundingAmount,
    goalAmount,
    fundingFrequency,
    startingDate,
    goalFinishDate,
  ]);

  return (
    <>
      <p className="description">How long will it take to reach my goal?</p>
      <div
        aria-label="Calculator to generate a savings goal date"
        role="tabpanel"
        id="generate-date"
      >
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
            <span className="calc-value">{strGoalFinishDate}</span>
          ) : (
            ""
          )}
          .
        </p>
      </div>
    </>
  );
};

export default GenerateDate;
