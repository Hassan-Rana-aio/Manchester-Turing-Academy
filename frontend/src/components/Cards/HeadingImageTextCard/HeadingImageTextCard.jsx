const HeadingImageTextCard = ({ componentData }) => {
  return (
    <div className=" rounded p-8 grid gap-3 hover:scale-105 cursor-pointer hover:shadow-2xl transition-shadow duration-200">
      <h1 className="h-[40px] text-[16px] uppercase tracking-widest text-textGrayHigh text-center">
        {componentData?.headingText}
      </h1>
      <div className="max-w-[350px] max-h-[250px] justify-self-center	">
        <img
          src={componentData?.image}
          alt=""
          srcset=""
          className="h-[250px]"
        />
      </div>
      <p className="h-[150px] font-roboto-light justify-self-center text-base text-center max-w-[320px]">
        {componentData?.text}
      </p>
    </div>
  );
};

export default HeadingImageTextCard;
