type TextInputProps = {
  name: string;
  value: string;
  setValue: (input: string) => void;
};

const TextInput = ({ name, value, setValue }: TextInputProps) => {
  const nameId = name.toLowerCase().replace(" ", "-");

  return (
    <label id={nameId} title={name}>
      <input
        name={nameId}
        type="text"
        placeholder={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
};

export default TextInput;
