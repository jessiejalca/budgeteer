import React from "react";

const Calculator = () => {
    const [savingsGoal, setSavingsGoal] = React.useState<string>("");
    const [goalAmount, setGoalAmount] = React.useState<number>(0);
    const [amountSaved, setAmountSaved] = React.useState<number>(0);
    const [fundingFrequency, setFundingFrequency] = React.useState<string>("weekly");

    // Set the default date to today
    const today: string = new Date().toISOString().split("T")[0];
    const [targetDate, setTargetDate] = React.useState<string>(today);

    const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFundingFrequency(e.target.value);
    };

    return (
    <>
      <form>
        <label>
          <span>What are you saving for?</span>
          <input
            type="text"
            value={savingsGoal}
            onChange={(e) => setSavingsGoal(e.target.value)}
          />
        </label>
        <label>
          <span>How much do you need?</span>
          <input
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(Number(e.target.value))}
          />
        </label>
        <label>
          <span>How much do you have already?</span>
          <input type="number" value={amountSaved} onChange={(e) => setAmountSaved(Number(e.target.value))} />
        </label>
        <label>
          <span>How often do you want to fund this goal?</span>
          <select value={fundingFrequency} onChange={handleFrequencyChange}>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label>
          <span>What's your target date?</span>
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} min={today} />
        </label>
        <button type="submit">Calculate</button>
      </form>
      {(
        <p>
          You need ${goalAmount} {fundingFrequency} to meet your {savingsGoal} goal by {targetDate}.
        </p>
      )}
    </>
  );
};

export default Calculator;