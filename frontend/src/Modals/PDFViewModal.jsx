import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchCourseFile } from "../services/Course";
import Loader from "../components/Loader/Loader";

const PDFViewModal = (props) => {
  const [courseFileURL, setCourseFileURL] = useState(null);
  const [fileLoader, setFileLoader] = useState(false);

  const getCourseFile = async (courseId) => {
    setFileLoader(true);
    const params = {
      course_id: courseId,
    };
    try {
      const response = await fetchCourseFile(params);
      if (response.status === 200) {
        const fileURL = URL.createObjectURL(response?.data);
        setCourseFileURL(fileURL);
      }
      setFileLoader(false);
    } catch (e) {
      toast.error("File View Request Failed");
      setFileLoader(false);
    }
  };

  useEffect(() => {
    getCourseFile(props?.course);
  }, []);

  return (
    <div className="w-[500px] h-[500px] min-w-52 min-h-52 lg:min-w-96 lg:min-h-52 md:min-w-96 md:min-h-52 flex justify-center items-center">
      {fileLoader ? (
        <Loader />
      ) : (
        courseFileURL && <iframe src={courseFileURL} className="h-full w-full pt-8" />
      )}
    </div>
  );
};

export default PDFViewModal;
