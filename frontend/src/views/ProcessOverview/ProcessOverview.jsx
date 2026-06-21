import ImageHeadingTextCard from "../../components/Cards/ImageHeadingTextCard/ImageHeadingTextCard";

const ProcessOverview = (props) => {
  return (
    <div>
      <h1 className="text-4xl text-center py-8">PRINCIPLE STEPS</h1>

      <div className="grid grid-cols-4 gap-2">
        {props?.processOverviewData?.map((data, index) => {
          return (
            <ImageHeadingTextCard
              key={index}
              cardImage={data?.image}
              cardHeading={data?.headingText}
              cardText={data?.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProcessOverview;
