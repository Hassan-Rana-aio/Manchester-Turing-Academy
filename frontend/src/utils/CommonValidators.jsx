const isName = (name) => {
  let regex = /^[a-zA-Z ]{2,30}$/;

  return regex.test(name);
};
const isUserName = (username) => {
  let regex = /^[a-z0-9_-]{3,15}$/;
  let regexTwo = /[A-Za-z]/i;

  return regex.test(username);
};
const isEmpty = (string) => {
  let regex = /^\s+$/;

  return regex.test(string) || string === "";
};
const isEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regex2 = /^[0-9]/;

  return regex.test(email) && !regex2.test(email);
};

const isNumber = (number) => {
  const regex = /^[0-9]*$/;
  return regex.test(number);
};

function validatePassword(password) {
  // At least one lowercase letter, one uppercase letter, one digit, and one special character
  var pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/;

  return pattern.test(password);
}

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(dateString) {
  return dateRegex.test(dateString);
}

const urlRegex = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;

function isValidWebsite(url) {
  return urlRegex.test(url);
}

const Validations = {
  isName,
  isUserName,
  isEmpty,
  isEmail,
  validatePassword,
  isNumber,
  isValidDate,
  isValidWebsite,
};
export default Validations;
