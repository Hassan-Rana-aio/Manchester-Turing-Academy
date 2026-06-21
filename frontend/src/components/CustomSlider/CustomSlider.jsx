import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomSlider.css";

const CustomSlider = ({ sliderSettings, sliderData, SliderComponent }) => {
  return (
    <Slider {...sliderSettings}>
      {sliderData?.map((data, index) => {
        return (
          <div key={index} className="pb-2">
            <SliderComponent key={index} componentData={data} />
          </div>
        );
      })}
    </Slider>
  );
};

export default CustomSlider;
