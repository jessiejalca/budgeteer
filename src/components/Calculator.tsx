import React from "react";

const Calculator = () => {
    const [savingsGoal, setSavingsGoal] = React.useState<string>("");
    const [goalAmount, setGoalAmount] = React.useState<number>(0);

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
          <span>How much do you have set aside for this goal already?</span>
          <input type="number" />
        </label>
        <label>
          <span>How often do you want to fund this goal?</span>
          <select>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label>
          <span>What's your target date?</span>
          <input type="date" />
        </label>
        <button type="submit">Calculate</button>
      </form>
      {savingsGoal && (
        <p>
          You need ${goalAmount} to meet your {savingsGoal} goal.
        </p>
      )}
    </>
  );
};

export default Calculator;