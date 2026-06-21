import { useState } from "react";
import Button from "../../../components/Button/Button";
import ComponentModal from "../../../components/Modals/ComponentModal/ComponentModal";
import ManageCourseModal from "../../../Modals/ManageCourseModal";
import DeleteModalComponent from "../../../Modals/DeleteModal";
import PDFViewModal from "../../../Modals/PDFViewModal";
import { deleteCourse } from "../../../services/Course";
import { toast } from "react-toastify";

const ManageCoursesTable = (props) => {
  const [selectedCourseData, setSelectedCourseData] = useState(null);
  const [courseUpdateModal, setCourseUpdateModal] = useState(false);
  const [deleteUpdateModal, setDeleteUpdateModal] = useState(false);
  const [viewFileModal, setViewFileModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);

  // To open Course update modal
  const handleUpdateCourseModal = (courseData) => {
    setSelectedCourseData(courseData);
    setCourseUpdateModal((prevValue) => !prevValue);
  };

  // To open Course delete modal
  const handleDeleteCourseModal = (courseData) => {
    courseData && setSelectedCourseData(courseData);
    setDeleteUpdateModal((prevValue) => !prevValue);
  };

  // To open Course delete modal
  const handleViewFileModal = (courseData) => {
    courseData && setSelectedCourseData(courseData);
    setViewFileModal((prevValue) => !prevValue);
  };

  // delete Course
  const deleteCourseById = async (courseId) => {
    setButtonLoader(true);
    const params = {
      course_id: courseId,
    };
    try {
      const response = await deleteCourse(params);
      if (response.status === 200) {
        toast.success("Course deleted successfully");
        handleDeleteCourseModal(null);
        props.setPageNumber(0);
        props.setRefreshData((prevValue) => !prevValue);
      } else {
        toast.error("Failed to delete record");
      }
      setButtonLoader(false);
    } catch {
      toast.error("Failed to delete record");
      setButtonLoader(false);
    }
    setButtonLoader(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-headerColor text-white">
            <th className="py-2 px-4 border-b">Course Name</th>
            <th className="py-2 px-4 border-b">Course Type</th>
            <th className="py-2 px-4 border-b">Course Price</th>
            <th className="py-2 px-4 border-b">Course File</th>
            <th className="py-2 px-4 border-b" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {props?.courseData?.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{item?.course_name}</td>
              <td className="py-2 px-4 border-b">
                {item?.course_type?.course_type_name}
              </td>
              <td className="py-2 px-4 border-b">{item?.course_price}</td>
              <td className="py-2 px-4 border-b">
                <Button
                  buttonText={"View File"}
                  buttonClass={"p-2 bg-green-600 text-white"}
                  funcToCall={() => handleViewFileModal(item)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <Button
                  buttonText={"View"}
                  buttonClass={"p-2 bg-yellow-600 text-white"}
                  funcToCall={() => handleUpdateCourseModal(item)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <Button
                  buttonText={"Delete"}
                  buttonClass={"p-2 bg-[#ff0000] text-white"}
                  funcToCall={() => handleDeleteCourseModal(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ComponentModal
        isOpen={courseUpdateModal}
        closeModal={handleUpdateCourseModal}
        modalHeading={"Update Course"}
        modalHeadingClassName={"text-4xl pb-6"}
        MyComp={
          <ManageCourseModal
            closeModal={handleUpdateCourseModal}
            fetchCourse={true}
            courseData={selectedCourseData}
            setRefreshData={props.setRefreshData}
          />
        }
        formData={null}
        submitData={null}
      />
      <ComponentModal
        isOpen={deleteUpdateModal}
        closeModal={handleDeleteCourseModal}
        MyComp={
          <DeleteModalComponent
            functionToCall={deleteCourseById}
            params={selectedCourseData?.course_id}
            loader={buttonLoader}
          />
        }
        formData={null}
        submitData={null}
      />
      <ComponentModal
        isOpen={viewFileModal}
        closeModal={handleViewFileModal}
        MyComp={<PDFViewModal course={selectedCourseData?.course_id} />}
        formData={null}
        submitData={null}
      />
    </div>
  );
};

export default ManageCoursesTable;
