/** Service to handle course crud operations */

import apiInstance from "../Api";
import apiRoutes from "../constants/APIRoutes/apiRoutes";

const addCourse = async (formData, courseFile) => {
  const response = await apiInstance.post(apiRoutes.COURSE, courseFile, {
    params: formData,
  });

  return response;
};

export default addCourse;

export const getCourse = async (params) => {
  const response = await apiInstance.get(apiRoutes.COURSE, {
    params: params,
  });

  return response;
};

export const updateCourse = async (formData, courseFile) => {
  const response = await apiInstance.patch(apiRoutes.COURSE, courseFile, {
    params: formData,
  });

  return response;
};

export const deleteCourse = async (formData) => {
  const response = await apiInstance.delete(apiRoutes.COURSE, {
    params: formData,
  });

  return response;
};

export const fetchCourseFile = async (formData) => {
  const response = await apiInstance.put(apiRoutes.COURSE, null, {
    params: formData,
    responseType: "blob",
  });

  return response;
};
