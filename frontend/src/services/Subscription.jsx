/** Service to handle subscription API */

import apiInstance from "../Api";
import apiRoutes from "../constants/APIRoutes/apiRoutes";

const checkUserSubscription = async (courseId) => {
  const response = await apiInstance.post(
    `${apiRoutes.SUBSCRIPTION}verification`,
    null,
    {
      params: courseId,
    }
  );

  return response;
};

export default checkUserSubscription;

export const purchaseCourse = async (checkoutDetails) => {
  const response = await apiInstance.post(
    apiRoutes.SUBSCRIPTION,
    checkoutDetails
  );

  return response;
};

export const updateCourseSubscription = async (checkoutDetails) => {
  const response = await apiInstance.post(
    `${apiRoutes.SUBSCRIPTION}update_course_subscription`,
    null,
    {
      params: checkoutDetails,
    }
  );

  return response;
};
