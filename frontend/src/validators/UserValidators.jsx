import { toast } from "react-toastify";
import Validations from "../utils/CommonValidators";

const validateAddUser = (formData) => {
  if (Validations.isEmpty(formData?.first_name)) {
    toast.error("First Name cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.last_name)) {
    toast.error("Last Name cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.email)) {
    toast.error("Email cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.username)) {
    toast.error("Username cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.password)) {
    toast.error("Password cannot be empty");
    return false;
  }

  if (!Validations.isEmail(formData?.email)) {
    toast.error("Email address is invalid");
    return false;
  }

  if (formData?.password !== formData?.confirm_password) {
    toast.error("Password mismatch");
    return false;
  }

  return true;
};

export default validateAddUser;

export const loginValidator = (formData) => {
  if (Validations.isEmpty(formData?.user_identity)) {
    toast.error("User Identity cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.user_password)) {
    toast.error("Password cannot be empty");
    return false;
  }

  return true;
};

export const resetPasswordValidator = (formData) => {
  if (Validations.isEmpty(formData?.user_identity)) {
    toast.error("Please enter your email or username");
    return false;
  } else if (Validations.isEmpty(formData?.first_name)) {
    toast.error("First Name cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.last_name)) {
    toast.error("Last Name cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.new_password)) {
    toast.error("New Password cannot be empty");
    return false;
  } else if (formData?.new_password !== formData?.confirm_password) {
    toast.error("New Password and Confirm Password mismatch");
    return false;
  }

  return true;
};

export const validateUpdateUser = (formData) => {
  if (Validations.isEmpty(formData?.first_name)) {
    toast.error("First Name cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.last_name)) {
    toast.error("Last Name cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.email)) {
    toast.error("Email cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.username)) {
    toast.error("Username cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.password)) {
    toast.error("Password cannot be empty");
    return false;
  }

  if (!Validations.isEmail(formData?.email)) {
    toast.error("Email address is invalid");
    return false;
  }

  if (
    !Validations.isEmail(formData?.new_password) &&
    formData?.new_password !== formData?.confirm_password
  ) {
    toast.error("New Password and Confirm New Password Mismatch");
    return false;
  }

  return true;
};

export const validateAdminAddUpdateUser = (formData) => {
  if (Validations.isEmpty(formData?.first_name)) {
    toast.error("First Name cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.last_name)) {
    toast.error("Last Name cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.email)) {
    toast.error("Email cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.username)) {
    toast.error("Username cannot be empty");
    return false;
  } else if (Validations.isEmpty(formData?.password)) {
    toast.error("Password cannot be empty");
    return false;
  }

  if (!Validations.isEmail(formData?.email)) {
    toast.error("Email address is invalid");
    return false;
  }

  return true;
};
