const yup = require('yup');

module.exports = yup.object().shape({
  url: yup
    .string()
    .url()
    .required(),
  isAlias: yup.boolean(),
  aliasForShorUrl: yup.string().when('isAlias', { is: true, then: yup.string().required('Please enter alias for url.') }),
});
