import isEmail from 'validator/lib/isEmail';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!isEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!values.username) {
    errors.username = 'Required';
  }

  return errors;
};

export default validate;
