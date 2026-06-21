const InputFieldWithIcon = ({
  divClassName,
  type,
  name,
  id,
  value,
  onChange,
  className,
  placeholder,
  PrimaryIcon,
  primaryIconColor,
  primaryIconClassName,
  primaryOnClick,
  SecondaryIcon,
  secondaryIconColor,
  secondaryIconClassName,
  secondaryOnClick,
  displaySecondaryIcon = false,
}) => {
  return (
    <div
      className={
        divClassName
          ? divClassName
          : "border-[1px] border-black flex items-center justify-between sm:text-md"
      }
    >
      <input
        name={name}
        id={id}
        className={
          className ? className : "w-full outline-none border-none p-2 mx-2 "
        }
        placeholder={placeholder ? placeholder : "Enter Here"}
        type={type}
        value={value}
        onChange={onChange}
      />
      <button
        className={
          primaryIconClassName
            ? primaryIconClassName
            : "rounded px-2 mr-2 py-2 focus:outline-none text-white hover:bg-gray-100"
        }
        onClick={primaryOnClick}
      >
        <PrimaryIcon color={primaryIconColor} />
      </button>

      {displaySecondaryIcon && (
        <button
          className={
            secondaryIconClassName
              ? secondaryIconClassName
              : "rounded px-2 mr-2 py-2 focus:outline-none text-white hover:bg-gray-100"
          }
          onClick={secondaryOnClick}
        >
          <SecondaryIcon color={secondaryIconColor} />
        </button>
      )}
    </div>
  );
};

export default InputFieldWithIcon;
