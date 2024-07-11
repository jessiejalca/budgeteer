import React from "react";
import NumberInput from "../inputs/NumberInput";
import DateInput from "../inputs/DateInput";
import DropdownInput from "../inputs/DropdownInput";
import TextInput from "../inputs/TextInput";
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
    <>
      <p className="description">How much do I actually need to save?</p>
      <div aria-label="Target Date Calculator" role="tabpanel" id="target-date">
        <p>
          With {/* amount already saved */}
          <NumberInput
            name="Amount Saved"
            step={10}
            numberValue={amountSaved}
            setNumberValue={setAmountSaved}
          />{" "}
          already saved, I need to contribute
          {/* amount calculated */}{" "}
          <span className="calc-value">${amountPerPeriod}</span>
          {/* funding frequency */}
          {" every "}
          <DropdownInput
            name="Funding Frequency"
            value={fundingFrequency}
            options={["week", "two-weeks", "month"]}
            onChange={handleFrequencyChange}
          />{" "}
          starting {/* starting date */}
          <DateInput
            name="Starting Date"
            dateValue={startingDate}
            setDateValue={setStartingDate}
          />{" "}
          to meet my goal of {/* goal amount */}
          <NumberInput
            name="Goal Amount"
            step={100}
            numberValue={goalAmount}
            setNumberValue={setGoalAmount}
          />{" "}
          for {/* savings goal name */}
          <TextInput
            name="Savings Goal"
            value={savingsGoal}
            setValue={setSavingsGoal}
          />{" "}
          by {/* goal target date */}
          <DateInput
            name="Goal Target Date"
            dateValue={targetDate}
            setDateValue={setTargetDate}
            minDate={aMonthFromToday}
          />
          .
        </p>
      </div>
    </>
  );
};

export default TargetDate;
