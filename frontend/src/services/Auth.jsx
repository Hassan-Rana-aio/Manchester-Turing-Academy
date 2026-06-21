/** Service to handle authentication operations */

import apiInstance from "../Api";
import apiRoutes from "../constants/APIRoutes/apiRoutes";

const signInService = async (formData) => {
  const response = await apiInstance.post(apiRoutes.LOGIN, formData);

  return response;
};

export default signInService;

/** Request a password reset OTP to be emailed to the user */
export const forgotPasswordService = async (formData) => {
  const response = await apiInstance.post(apiRoutes.FORGOT_PASSWORD, formData);

  return response;
};

/** Reset the password using the emailed OTP */
export const resetPasswordService = async (formData) => {
  const response = await apiInstance.post(apiRoutes.RESET_PASSWORD, formData);

  return response;
};
