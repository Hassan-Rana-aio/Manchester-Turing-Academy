/** Service to handle user crud operations */

import apiInstance from "../Api";
import apiRoutes from "../constants/APIRoutes/apiRoutes";

const addUser = async (formData) => {
  const response = await apiInstance.post(apiRoutes.USER, formData);

  return response;
};

export default addUser;

export const getUser = async (params) => {
  const response = await apiInstance.get(apiRoutes.USER, {
    params: params,
  });

  return response;
};

export const updateUser = async (formData) => {
  const response = await apiInstance.patch(apiRoutes.USER, formData);

  return response;
};

export const deleteUser = async (formData) => {
  const response = await apiInstance.delete(apiRoutes.USER, {
    data: formData,
  });

  return response;
};
