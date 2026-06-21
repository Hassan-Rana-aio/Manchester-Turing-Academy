/** Service to handle authentication operations */

import apiInstance from "../Api";
import apiRoutes from "../constants/APIRoutes/apiRoutes";

const signInService = async (formData) => {
  const response = await apiInstance.post(apiRoutes.LOGIN, formData);

  return response;
};

export default signInService;

/** Reset the password after verifying the user's identity (no email) */
export const resetPasswordService = async (formData) => {
  const response = await apiInstance.post(apiRoutes.RESET_PASSWORD, formData);

  return response;
};
