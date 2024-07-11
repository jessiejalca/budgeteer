import React from "react";
import TabSet from "./ui/TabSet";
import TargetDate from "./calculators/TargetDate";
import TargetAmount from "./calculators/TargetAmount";

const Calculator = () => {
  // Decide which calculator to render based on the user's selection
  const [calculator, setCalculator] = React.useState<string>("target-date");

  // Set the default starting date to today
  const today: string = new Date().toISOString().split("T")[0];
  const [startingDate, setStartingDate] = React.useState<string>(today);

  // Get the value of the selected frequency
  const [fundingFrequency, setFundingFrequency] =
    React.useState<string>("week");

  // Handle the change of the funding frequency
  const handleFrequencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFundingFrequency(e.target.value);
  };

  return (
    <>
      <div>
        <TabSet
          setCalculator={setCalculator}
          calculator={calculator}
          tabNames={["target-date", "target-amount"]}
        />
      </div>
      {/* Render the selected calculator */}
      <main>
        {calculator === "target-date" ? (
          <TargetDate
            startingDate={startingDate}
            setStartingDate={setStartingDate}
            fundingFrequency={fundingFrequency}
            handleFrequencyChange={handleFrequencyChange}
          />
        ) : (
          <TargetAmount
            startingDate={startingDate}
            setStartingDate={setStartingDate}
            fundingFrequency={fundingFrequency}
            handleFrequencyChange={handleFrequencyChange}
          />
        )}
      </main>
    </>
  );
};

export default Calculator;
