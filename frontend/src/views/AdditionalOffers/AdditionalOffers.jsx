import { RiComputerLine } from "react-icons/ri";
import { LiaRobotSolid } from "react-icons/lia";
import { CgInsights } from "react-icons/cg";
import IconHeadingTextCard from "../../components/Cards/IconHeadingTextCard/IconHeadingTextCard";

function AdditionalOffers() {
  return (
    <div className="py-16 lg:px-16 md:px-16">
      <div className="whatdotext pb-8">
        <div className="pb-8 pt-2">
          <h1 className="font-nunito-sans font-semibold tracking-widest uppercase text-center text-[1.75rem] py-3">
            ADDITIONAL
            <span className="text-textBlue"> OFFERS</span>
          </h1>
        </div>
        <div className="text-textGray flex justify-center">
          <p className="md:w-[80%] lg:w-[70%] w-[70%] text-center">
            These courses simplify complex AI concepts, making them accessible
            to everyone. Students learn how AI systems mimic human intelligence,
            recognize patterns, and make decisions based on data. The curriculum
            emphasizes practical applications in different business sectors,
            enabling learners from various backgrounds to understand and
            leverage AI in their respective fields.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-items-center gap-4 px-8 lg:px-0 md:px-0 py-8">
        <div className="">
          <div className="h-[100%]">
            <IconHeadingTextCard
              iconComponent={<RiComputerLine size={32} color="#1F9BCF" />}
              headingText={"Cutting-Edge Technology"}
              text={
                "The academy specializes in advanced technology education, equipping students with essential skills and knowledge for success in rapidly evolving fields."
              }
            />
          </div>
        </div>
        <div className="">
          <div className="h-[100%]">
            <IconHeadingTextCard
              iconComponent={
                <LiaRobotSolid size={32} color="#1F9BCF" />
              }
              headingText={"Simplified AI Concepts"}
              text={
                "Courses break down complex AI topics, making them accessible to all. Students learn how AI mimics human intelligence and recognizes patterns."
              }
            />
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <div className="md:w-[50%] lg:w-full w-full mx-auto h-[100%]">
            <IconHeadingTextCard
              iconComponent={<CgInsights size={32} color="#1F9BCF" />}
              headingText={"Practical applications"}
              text={
                "The curriculum emphasizes real-world applications across various business sectors, enabling learners to leverage AI effectively in their respective fields. "
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalOffers;
