const Results = (
  props: {
    goalAmount: number,
    fundingFrequency: string,
    savingsGoal: string,
    targetDate: string,
    amountSaved: number,
    amountPerPeriod: number
  }
) => {
  return (
    <p>
      With ${props.amountSaved} already saved, you need ${props.amountPerPeriod} {props.fundingFrequency} to meet your {props.savingsGoal} goal of ${props.goalAmount} by {new Date(props.targetDate).toDateString()}.
    </p>
  );
}

export default Results;