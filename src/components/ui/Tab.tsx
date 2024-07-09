type TabProps = {
  setCalculator: (calculator: string) => void;
  calculator: string;
  tabName: string;
};

const Tab = ({ setCalculator, calculator, tabName }: TabProps): JSX.Element => {
  return (
    <button
      role="tab"
      aria-selected={calculator === tabName ? "true" : "false"}
      aria-controls={"tabpanel-" + tabName}
      id={"tab-" + tabName}
      onClick={() => setCalculator(tabName)}
    >
      {tabName.replace("-", " ")}
    </button>
  );
};

export default Tab;
