import React from "react";
import TargetDate from "./TargetDate";
import TargetAmount from "./TargetAmount";

const Calculator = () => {
  // Decide which calculator to render based on the user's selection
  const [calculator, setCalculator] = React.useState<string>("target-date");

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
      <div>
        <button
          role="tab"
          aria-selected={calculator === "target-date" ? "true" : "false"}
          aria-controls="tabpanel-target-date"
          id="tab-target-date"
          onClick={() => setCalculator("target-date")}
        >
          Target Date
        </button>
        <button
          role="tab"
          aria-selected={calculator === "target-amount" ? "true" : "false"}
          onClick={() => setCalculator("target-amount")}
        >
          Target Amount
        </button>
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
          <TargetAmount />
        )}
      </main>
    </>
  );
};

export default Calculator;
