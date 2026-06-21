const InputField = ({
  type,
  name,
  id,
  value,
  onChange,
  className,
  placeholder,
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={
        className ? className : "border-b-2 border-[#00171f] p-1 outline-none"
      }
      placeholder={placeholder ? placeholder : "Enter here"}
    />
  );
};

export default InputField;
