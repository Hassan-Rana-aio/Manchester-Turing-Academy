const IconHeadingTextCard = ({ iconComponent, headingText, text }) => {
  return (
    <div className="h-inherit border-1 hover:text-textBlue hover:shadow-2xl transition-shadow duration-100">
      <div className="flex flex-col gap-4 pt-4 pb-12 px-2 items-center">
        <div className="rounded-full p-4 shadow-lg w-fit align-self-center">
          {iconComponent}
        </div>

        <h1 className="text-[20px] text-[#4F4F4F] font-semibold tracking-widest uppercase text-center mx-2">
          {" "}
          {headingText}{" "}
        </h1>

        <p className="text-[15px] text-textGray text-center w-[80%]">
          {" "}
          {text}{" "}
        </p>
      </div>
    </div>
  );
};

export default IconHeadingTextCard;
