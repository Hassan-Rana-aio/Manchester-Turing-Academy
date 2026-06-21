import OUR_PLATFORM_ITEMS from "./OurPlatformData";
import CustomSlider from "../../components/CustomSlider/CustomSlider";
import sliderSettings from "../../constants/SliderSettings/SliderSettings";
import HeadingImageTextCard from "../../components/Cards/HeadingImageTextCard/HeadingImageTextCard";

const OurPlatform = () => {
  return (
    <div className="py-16 md:px-16 lg:px-16">
      <h1 className="tracking-widest text-center uppercase text-[1.75rem] mb-12 text-[#1a1a1a] font-semibold">
        Our <span className="text-textBlue">Platform</span>
      </h1>
      <CustomSlider
        sliderSettings={sliderSettings}
        SliderComponent={HeadingImageTextCard}
        sliderData={OUR_PLATFORM_ITEMS}
      />
    </div>
  );
};

export default OurPlatform;
