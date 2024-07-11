type DropdownInputProps = {
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DropdownInput = ({
  name,
  value,
  options,
  onChange,
}: DropdownInputProps) => {
  const nameId = name.toLowerCase().replace(" ", "-");

  return (
    <label id={nameId} title={name}>
      <select name={nameId} value={value} onChange={onChange}>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option.replace("-", " ")}
          </option>
        ))}
      </select>
    </label>
  );
};

export default DropdownInput;
