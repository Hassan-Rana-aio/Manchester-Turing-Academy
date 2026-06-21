import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import DisplayCourse from "./DisplayCourse";
import { useEffect, useRef, useState } from "react";
import coursesTypes from "../../data/coursesTypes/courseTypes";
import getCourseTypes from "../../services/CourseType";
import { getCourse } from "../../services/Course";
import ProcessOverview from "../ProcessOverview/ProcessOverview";
import principleSteps from "../../data/principleSteps/principleSteps";

const Course = () => {
  const [useEffectController, setUseEffectController] = useState(false);
  const [coursesTypesData, setCoursesTypesData] = useState([]);
  const [courseTypeActualName, setCourseTypeActualName] = useState(null);
  const [selectedCourseType, setSelectedCourseType] = useState(null);
  const [courseStaticInformation, setCourseStaticInformation] = useState(null);
  const [principleStepsData, setPrincipleStepsData] = useState(null);
  const [coursesData, setCoursesData] = useState([]);
  const [searchName, setSearchName] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const { course_type_name } = useParams();

  const courseTypesTransformedNames = {
    ai: "Artificial Intelligence",
    ai_application: "AI Applications",
    robotics: "Robotics",
  };

  const getCoursesTypes = async () => {
    try {
      const response = await getCourseTypes();
      if (response.status === 200) {
        setCoursesTypesData(response?.data?.data);
      }
    } catch {}
  };

  const getCourseInformation = async () => {
    const getCourseParams = {
      page_number: pageNumber * pageSize,
      page_size: pageSize,
      course_type_id: selectedCourseType?.course_type_id,
      search: searchName,
    };

    try {
      const response = await getCourse(getCourseParams);
      if (response.status === 200) {
        setCoursesData(response?.data?.data);
        setTotalRecords(response?.data?.total_count);
      }
    } catch {}
  };

  /** useEffects */

  useEffect(() => {
    getCourseInformation();
  }, [pageNumber, selectedCourseType, searchName]);

  useEffect(() => {
    setPageNumber(0);
  }, [searchName]);

  useEffect(() => {
    course_type_name &&
      setCourseStaticInformation(coursesTypes[course_type_name]);

    course_type_name && setPrincipleStepsData(principleSteps[course_type_name]);

    coursesTypesData &&
      course_type_name &&
      setCourseTypeActualName(courseTypesTransformedNames[course_type_name]);

    // handle multiple requests
    setPageNumber(0);
  }, [course_type_name]);

  useEffect(() => {
    coursesTypesData &&
      setSelectedCourseType(
        coursesTypesData.filter(
          (courseTypeObj) =>
            courseTypeObj.course_type_name === courseTypeActualName
        )[0]
      );
  }, [courseTypeActualName, coursesTypesData]);

  useEffect(() => {
    getCoursesTypes();
  }, []);

  return (
    <div>
      <Header />
      {/* Here we can get course related data to a component and display there */}
      {/* Display Invalid course name when an invalid course name fetched */}

      <DisplayCourse
        key={course_type_name}
        courseStaticInformation={courseStaticInformation}
        coursesData={coursesData}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalRecords={totalRecords}
        setTotalRecords={setTotalRecords}
        setSearchName={setSearchName}
      />

      <div className="px-8 py-8">
        {principleStepsData && (
          <ProcessOverview processOverviewData={principleStepsData} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Course;
