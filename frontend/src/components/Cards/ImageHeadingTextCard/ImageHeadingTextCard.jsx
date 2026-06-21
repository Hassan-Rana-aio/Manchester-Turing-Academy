const ImageHeadingTextCard = (props) => {
  return (
    <div className="max-w-[400px] shadow-lg flex flex-col gap-2">
      <div className="pb-2">
        <img
          className="lg-h-[250px] md:h-[200px] h-fit w-full"
          src={props?.cardImage}
          alt=""
          srcset=""
        />
      </div>

      <div className="px-2">
        <h1 className="text-[24px]">{props?.cardHeading}</h1>
      </div>

      <div className="p-2">
        <p className="font-roboto-light text-slate-600">{props?.cardText}</p>
      </div>
    </div>
  );
};

export default ImageHeadingTextCard;
