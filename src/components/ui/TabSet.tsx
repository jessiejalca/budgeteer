import Tab from "./Tab";

type TabSetProps = {
  setCalculator: (calculator: string) => void;
  calculator: string;
  tabNames: string[];
};

const TabSet = ({ setCalculator, calculator, tabNames }: TabSetProps) => {
  return (
    <div className="tab-group">
      {tabNames.map((tabName) => (
        <Tab
          key={tabName}
          setCalculator={setCalculator}
          calculator={calculator}
          tabName={tabName}
        />
      ))}
    </div>
  );
};

export default TabSet;
