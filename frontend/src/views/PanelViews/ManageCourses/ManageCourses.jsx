import Button from "../../../components/Button/Button";
import ManageCoursesTable from "./ManageCoursesTable";
import SearchWithIcons from "../../../components/SearchWithIcons/SearchWithIcons";
import { useEffect, useState } from "react";
import { getCourse } from "../../../services/Course";
import ComponentModal from "../../../components/Modals/ComponentModal/ComponentModal";
import ManageCourseModal from "../../../Modals/ManageCourseModal";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";

const ManageCourses = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [courseSearch, setCourseSearch] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [totalRecords, setTotalRecords] = useState(0);

  const [localSearchValue, setLocalSearchValue] = useState(null);
  const [showCancelButton, setShowCancelButton] = useState(false);

  const [courseAddModal, setCourseAddModal] = useState(false);
  const [loader, setLoader] = useState(true);

  // To open course add modal
  const handleAddModal = () => {
    setCourseAddModal((prevValue) => !prevValue);
  };

  // get course details here
  const getCourses = async (pageNumber, pageSize, search) => {
    // prepare params for get course request
    const params = {
      page_size: pageSize,
      page_number: pageNumber * pageSize,
      search: search,
    };

    setLoader(true);
    try {
      const response = await getCourse(params);
      if (response.status === 200) {
        setCourseData(response?.data?.data);
        setTotalRecords(response?.data?.total_count);
      }
      setLoader(false);
    } catch {
      setLoader(false);
    }
    setLoader(false);
  };

  // useEffects
  useEffect(() => {
    getCourses(pageNumber, pageSize, courseSearch);
  }, [pageNumber, courseSearch, refreshData]);

  useEffect(() => {
    setPageNumber(0);
  }, [courseSearch]);

  return (
    <div className="px-4 h-full">
      {loader ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="pt-8 pb-4 border-b-2 border-black">
            <h1 className="text-5xl">Courses</h1>
          </div>
          <div className="pt-4 pb-2 grid lg:grid-cols-2 md:grid-cols-2 lg:gap-0 md:gap-0 gap-4 grid-cols-1 justify-items items-center">
            <div className="self-end">
              <Button
                buttonText={"Add Course"}
                funcToCall={handleAddModal}
                buttonClass={
                  "bg-buttonGreen p-2 text-white hover:bg-buttonGreenDark"
                }
              />
            </div>
            <SearchWithIcons
              setSearchValue={setCourseSearch}
              localSearchValue={localSearchValue}
              setLocalSearchValue={setLocalSearchValue}
              showCancelButton={showCancelButton}
              setShowCancelButton={setShowCancelButton}
              divClass={"lg:justify-self-end md:justify-self-end"}
            />
          </div>
          <div className="py-1">
            {totalRecords > 0 ? (
              <ManageCoursesTable
                courseData={courseData}
                setPageNumber={setPageNumber}
                setRefreshData={setRefreshData}
              />
            ) : (
              <div className="flex justify-center">
                <p>No Data</p>
              </div>
            )}
          </div>
          <div className="grid justify-end lg:pb-1 md:pb-1 pb-4">
            {totalRecords > 0 && (
              <Pagination
                currentPage={pageNumber}
                pageSize={pageSize}
                totalRecords={totalRecords}
                functionToCall={setPageNumber}
              />
            )}
          </div>
        </div>
      )}

      <ComponentModal
        isOpen={courseAddModal}
        closeModal={handleAddModal}
        modalHeading={"Add Course"}
        modalHeadingClassName={"text-4xl pb-6"}
        MyComp={
          <ManageCourseModal
            closeModal={handleAddModal}
            setRefreshData={setRefreshData}
          />
        }
        formData={null}
        submitData={null}
      />
    </div>
  );
};

export default ManageCourses;
