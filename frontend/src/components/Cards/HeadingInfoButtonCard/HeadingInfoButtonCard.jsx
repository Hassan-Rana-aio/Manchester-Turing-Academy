import { Link } from "react-router-dom";

const HeadingInfoButtonCard = (props) => {
  return (
    <div className="bg-white shadow border-[1px] overflow-hidden grid gap-2 grid-cols-1 grid-rows-1 px-2 md:px-2 py-4 rounded">
      <div className="grid gap-2 grid-cols-1 text-wrap">
        <p>
          Course Name:{" "}
          <span className="font-bold">{props?.course_info?.course_name}</span>
        </p>
        <p>
          Course Type:{" "}
          <span className="font-bold">
            {props?.course_info?.course_type?.course_type_name}
          </span>
        </p>
        <p className="line-clamp-2">{props?.course_info?.course_description}</p>
      </div>

      <div className="my-2">
        <Link to={"/view_course/" + props?.course_info?.course_id} className="w-full grid">
          <button
            className="w-100 text-[12.5px] font-nunito-sans tracking-wider bg-buttonBlue py-[12px] px-4 text-sm uppercase text-white hover:bg-buttonBlueDark"
            onClick={null}
          >
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeadingInfoButtonCard;
