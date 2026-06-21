/** Service to handle course crud operations */

import apiInstance from "../Api";
import apiRoutes from "../constants/APIRoutes/apiRoutes";

const getCourseTypes = async (params) => {
  const response = await apiInstance.get(apiRoutes.COURSE_TYPES, {
    params: params,
  });

  return response;
};

export default getCourseTypes;
