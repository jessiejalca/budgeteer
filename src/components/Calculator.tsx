import React from "react";
import TabSet from "./ui/TabSet";
import GenerateAmount from "./calculators/GenerateAmount";
import GenerateDate from "./calculators/GenerateDate";

const Calculator = () => {
  // Decide which calculator to render based on the user's selection
  const [calculator, setCalculator] = React.useState<string>("generate-amount");

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
      <TabSet
        setCalculator={setCalculator}
        calculator={calculator}
        tabNames={["generate-amount", "generate-date"]}
      />
      {/* Render the selected calculator */}
      <main>
        {calculator === "generate-amount" ? (
          <GenerateAmount
            startingDate={startingDate}
            setStartingDate={setStartingDate}
            fundingFrequency={fundingFrequency}
            handleFrequencyChange={handleFrequencyChange}
          />
        ) : (
          <GenerateDate
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
