import { Oval } from "react-loader-spinner";

const Loader = ({ className, color, secondaryColor, strokeWidth, height }) => {
  return (
    <div
      className={className ? className : "flex justify-center items-center"}
      id="my--spinner"
    >
      <Oval
        color={color ? color : "#00171f"}
        secondaryColor={secondaryColor ? secondaryColor : "black"}
        strokeWidth={strokeWidth ? strokeWidth : "2"}
        height={height ? height : 64}
      />
    </div>
  );
};

export default Loader;
