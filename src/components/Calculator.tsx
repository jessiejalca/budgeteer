import React from "react";
import TargetDate from "./TargetDate";

const Calculator = () => {
  // Set the default starting date to today
  const today: string = new Date().toISOString().split("T")[0];
  const [startingDate, setStartingDate] = React.useState<string>(today);

  // Get the value of the selected frequency
  const [fundingFrequency, setFundingFrequency] =
    React.useState<string>("weekly");

  // Handle the change of the funding frequency
  const handleFrequencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFundingFrequency(e.target.value);
  };

  return (
    <>
      <form>
        <TargetDate
          startingDate={startingDate}
          setStartingDate={setStartingDate}
          fundingFrequency={fundingFrequency}
          handleFrequencyChange={handleFrequencyChange}
        />
      </form>
    </>
  );
};

export default Calculator;
