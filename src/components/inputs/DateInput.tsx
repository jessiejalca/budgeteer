type DateInputProps = {
  name: string;
  minDate?: string;
  dateValue: string;
  setDateValue: (date: string) => void;
};

const DateInput = ({
  name,
  minDate,
  dateValue,
  setDateValue,
}: DateInputProps) => {
  const nameId = name.toLowerCase().replace(" ", "-");

  return (
    <label id={nameId} title={name}>
      <input
        name={nameId}
        type="date"
        min={minDate || ""}
        value={dateValue}
        onChange={(e) => setDateValue(e.target.value)}
      />
    </label>
  );
};

export default DateInput;
