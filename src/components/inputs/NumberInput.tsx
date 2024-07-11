type NumberInputProps = {
  name: string;
  step: number;
  numberValue: number;
  setNumberValue: (numberValue: number) => void;
};

const NumberInput = ({
  name,
  step,
  numberValue,
  setNumberValue,
}: NumberInputProps) => {
  const nameId = name.toLowerCase().replace(" ", "-");
  return (
    <label id={nameId} title={name}>
      $
      <input
        name={nameId}
        type="number"
        placeholder={numberValue.toString()}
        min={0}
        step={step}
        onChange={(e) => setNumberValue(Number(e.target.value))}
      />
    </label>
  );
};

export default NumberInput;
