const yup = require('yup');

module.exports = yup.object().shape({
  url: yup
    .string()
    .url()
    .required(),
});
