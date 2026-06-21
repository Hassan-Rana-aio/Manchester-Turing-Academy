import { useEffect, useState, useContext } from "react";
import InputFieldWithLabel from "../components/InputFieldWithLabel/InputFieldWithLabel";
import addCourse, { getCourse, updateCourse } from "../services/Course";
import getCourseTypes from "../services/CourseType";
import Loader from "../components/Loader/Loader";
import Button from "../components/Button/Button";
import {
  validateAdminAddUpdateCourse,
  validateUpdateCourse,
} from "../validators/CourseValidator";
import { toast } from "react-toastify";
import SearchFieldWithLabel from "../components/SearchFieldWithLabel/SearchFieldWithLabel";

const ManageCourseModal = ({
  fetchCourse = false,
  closeModal,
  courseData,
  setRefreshData,
}) => {
  const [courseFile, setCourseFile] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [courseTypesLoader, setCourseTypesLoader] = useState(true);
  const [coursesTypes, setCoursesTypes] = useState([]);
  const [formData, setFormData] = useState({
    course_name: "",
    course_price: "",
    course_description: "",
    course_type_id: "",
    course_file: "",
  });

  function handleInputChange(e) {
    const { name, value, type, files } = e.target;

    let fileFormData = new FormData();
    if (type === "file") {
      const fileData = new FormData();
      fileData.append("file", files[0]);
      setCourseFile(fileData);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleCourse = () => {
    fetchCourse ? _updateCourse(formData) : _addCourse(formData);
  };

  const _updateCourse = async (formData) => {
    setButtonLoader(true);
    if (validateAdminAddUpdateCourse(formData)) {
      try {
        const response = await updateCourse(formData, courseFile);
        if (response.status === 200) {
          setButtonLoader(false);
          closeModal();
          toast.success("Course information updated successfully");
          setRefreshData((prevValue) => !prevValue);
        }
      } catch {
        setButtonLoader(false);
      }
    }
    setButtonLoader(false);
  };

  const _addCourse = async (formData) => {
    setButtonLoader(true);
    if (validateAdminAddUpdateCourse(formData)) {
      try {
        const response = await addCourse(formData, courseFile);
        if (response.status === 200) {
          toast.success("New course added successfully");
          closeModal();
          setRefreshData((prevValue) => !prevValue);
        }
        setButtonLoader(false);
      } catch {
        setButtonLoader(false);
      }
    }
    setButtonLoader(false);
  };

  const _getCourseTypes = async () => {
    setCourseTypesLoader(true);
    try {
      const response = await getCourseTypes();
      if (response.status === 200) {
        setCoursesTypes(
          response?.data?.data?.map((item) => ({
            value: item.course_type_id,
            name: item.course_type_name,
          }))
        );
        setCourseTypesLoader(false);
      }
    } catch {
      toast.error("Request Failed");
      setCourseTypesLoader(false);
    }
    setCourseTypesLoader(false);
  };

  useEffect(() => {
    _getCourseTypes();
    fetchCourse && setFormData(courseData);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 my-2 lg:px-8 md:px-8 px-1">
      <div className="grid">
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"Course Name"}
            placeholder={"Enter course name"}
            onChange={handleInputChange}
            id={"course_name"}
            name={"course_name"}
            value={formData?.course_name}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="username grid grid-col-1 gap-2">
          <SearchFieldWithLabel
            labelText={"Course Type"}
            className={"p-1 outline-none"}
            placeholder={"Enter course name"}
            onChange={handleInputChange}
            id={"course_type_id"}
            name={"course_type_id"}
            value={formData?.course_type_id}
            options={coursesTypes}
            optionLoader={courseTypesLoader}
          />
        </div>
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"number"}
            labelText={"Course Price"}
            placeholder={"Enter course price"}
            onChange={handleInputChange}
            id={"course_price"}
            name={"course_price"}
            value={formData?.course_price}
          />
        </div>
      </div>

      <div className="grid">
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"text"}
            labelText={"Course Description"}
            placeholder={"Enter course description"}
            onChange={handleInputChange}
            id={"course_description"}
            name={"course_description"}
            value={formData?.course_description}
          />
        </div>
      </div>

      <div className="grid">
        <div className="username grid grid-col-1 gap-2">
          <InputFieldWithLabel
            type={"file"}
            className={"p-1 outline-none"}
            labelText={"Course File"}
            onChange={handleInputChange}
            id={"course_file"}
            name={"course_file"}
            value={formData?.course_file}
          />
        </div>
      </div>

      <div className="justify-self-end flex gap-2">
        <div>
          {buttonLoader ? (
            <Loader height={48} />
          ) : (
            <Button
              buttonClass={
                "bg-buttonGreen p-2 text-white hover:bg-buttonGreenDark"
              }
              buttonText={"Submit"}
              funcToCall={handleCourse}
              params={formData}
            />
          )}
        </div>

        <Button
          buttonClass={"bg-textGray p-2 text-white hover:bg-textGrayHigh"}
          buttonText={"Close"}
          funcToCall={closeModal}
          params={formData}
        />
      </div>
    </div>
  );
};

export default ManageCourseModal;
