import { toast } from "react-toastify";
import Validations from "../utils/CommonValidators";

const validateAddCourse = (formData) => {
  if (Validations.isEmpty(formData?.course_name)) {
    toast.error("Invalid Course Name");
    return false;
  } else if (Validations.isEmpty(formData?.course_type_id)) {
    toast.error("Invalid Course Type");
    return false;
  } else if (Validations.isEmpty(formData?.course_price)) {
    toast.error("Invalid Course Price");
    return false;
  } else if (Validations.isEmpty(formData?.course_file)) {
    toast.error("Invalid Course File");
    return false;
  }

  return true;
};

export default validateAddCourse;

export const validateUpdateCourse = (formData) => {
  return true;
};

export const validateAdminAddUpdateCourse = (formData) => {
  if (Validations.isEmpty(formData?.course_name)) {
    toast.error("Invalid Course Name");
    return false;
  } else if (Validations.isEmpty(formData?.course_type_id)) {
    toast.error("Invalid Course Type");
    return false;
  } else if (Validations.isEmpty(formData?.course_price)) {
    toast.error("Invalid Course Price");
    return false;
  } else if (Validations.isEmpty(formData?.course_file)) {
    toast.error("Invalid Course File");
    return false;
  }

  return true;
};
