import { useState } from "react";
import HeadingInfoButtonCard from "../../components/Cards/HeadingInfoButtonCard/HeadingInfoButtonCard";
import Pagination from "../../components/Pagination/Pagination";
import SearchWithIcons from "../../components/SearchWithIcons/SearchWithIcons";

const DisplayCourse = (props) => {
  const [localSearchValue, setLocalSearchValue] = useState(null);
  const [showCancelButton, setShowCancelButton] = useState(false);
  return (
    <div className="grid">
      <div className="">
        <img
          src={props?.courseStaticInformation?.image}
          className="h-[700px] w-full object-fill"
          alt=""
        />
      </div>

      <div className="px-8">
        <div className="course-heading py-8">
          <h1 className="text-4xl py-2">
            {props?.courseStaticInformation?.heading}
          </h1>
          <div>
            {props?.courseStaticInformation?.text?.map((data, index) => {
              return <p className="py-2"> {data}</p>;
            })}
          </div>
        </div>
        <div>
          <p className="text-2xl">
            {props?.courseStaticInformation?.heading} Courses Lists
          </p>
        </div>
        <div className="grid lg:grid-cols-4 lg:gap-0 md:grid-cols-1 md:gap-0 grid-cols-1 gap-2 py-2">
          <SearchWithIcons
            localSearchValue={localSearchValue}
            setLocalSearchValue={setLocalSearchValue}
            setSearchValue={props?.setSearchName}
            showCancelButton={showCancelButton}
            setShowCancelButton={setShowCancelButton}
          />
          <div className="lg:col-span-3 md:col-span-1 col-span-1 lg:px-2 md:px-0 px-0  py-2">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {props?.coursesData?.length > 0 ? (
                props?.coursesData?.map((subData, index) => {
                  return <HeadingInfoButtonCard course_info={subData} />;
                })
              ) : (
                <div className="flex justify-center items-center w-full col-span-4 py-16">
                  <p>No Data Found</p>
                </div>
              )}
            </div>

            {props?.coursesData?.length > 0 && (
              <div className="py-2 flex justify-end">
                <Pagination
                  currentPage={props?.pageNumber}
                  pageSize={props?.pageSize}
                  totalRecords={props?.totalRecords}
                  functionToCall={props?.setPageNumber}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCourse;
