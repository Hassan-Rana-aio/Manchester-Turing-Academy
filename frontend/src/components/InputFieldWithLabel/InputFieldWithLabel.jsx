import InputField from "../InputField/InputField";

const InputFieldWithLabel = ({
  type,
  name,
  id,
  value,
  onChange,
  className,
  placeholder,
  labelClassName,
  labelText,
  mainDivClassName,
}) => {
  return (
    <div
      className={mainDivClassName ? mainDivClassName : "grid grid-cols-1 gap-2"}
    >
      <label htmlFor="" className={labelClassName ? labelClassName : "text-xs"}>
        {labelText}
      </label>
      <InputField
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
    </div>
  );
};

export default InputFieldWithLabel;
