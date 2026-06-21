import { useEffect, useState } from "react";
import HowItWorksItems from "./HowItWorksData";
import ImageTextCard from "../../components/Cards/ImageTextCard/ImageTextCard";
const HowItWorks = () => {
  const [currentSection, setCurrentSelection] = useState({});

  const selectSection = (data, index) => {
    setCurrentSelection(data);
  };

  useEffect(() => {
    setCurrentSelection(HowItWorksItems.length > 0 ? HowItWorksItems[0] : []);
  }, []);

  return (
    <div className="py-8 md:px-16 lg:px-16">
      <h1 className="font-semibold tracking-widest uppercase text-[1.75rem] text-center pb-8">
        How IT <span className="text-textBlue">Work's</span>
      </h1>
      <div className="py-8">
        <ul className="px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-3 justify-center">
          {HowItWorksItems?.map((data, index) => {
            return (
              <li
                key={index}
                className="text-[14px] font-semibold text-textGrayHigh hover:text-[#063c52] px-4 flex justify-center gap-1 pt-4 border-t-2 border-textGrayHigh hover:font-semibold cursor-pointer"
                onClick={() => selectSection(data, index)}
              >
                <p className="hidden md:block lg:block">{index + 1}.</p>{" "}
                <p>{data.headingText}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <ImageTextCard
        image={currentSection.image}
        text={currentSection.text}
        heading={currentSection.headingText}
      />
    </div>
  );
};

export default HowItWorks;
