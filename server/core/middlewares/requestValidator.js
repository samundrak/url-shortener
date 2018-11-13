module.exports = (schema) => {
  const validate = type => (req, res, next) => {
    schema
      .validate(req[type])
      .then(() => next())
      .catch(err => res.boom.badData('Please check all fields.', { message: err.name, data: err.errors }));
  };
  return {
    query: validate('query'),
    body: validate('body'),
  };
};
