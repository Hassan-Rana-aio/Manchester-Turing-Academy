import Loader from "../Loader/Loader";

const SearchFieldWithLabel = ({
  name,
  id,
  value,
  onChange,
  className,
  labelClassName,
  labelText,
  options,
  optionLoader,
}) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <label htmlFor="" className={labelClassName ? labelClassName : "text-xs"}>
        {labelText}
      </label>
      {optionLoader ? (
        <Loader height={32} />
      ) : (
        <select
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className={
            className
              ? className
              : "border-b-2 border-[#00171f] p-1 outline-none"
          }
        >
          <option value={""}>Select Here</option>;
          {options?.map((data, index) => {
            return (
              <option key={index} value={data?.value} className="text-black">
                {data?.name}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default SearchFieldWithLabel;
