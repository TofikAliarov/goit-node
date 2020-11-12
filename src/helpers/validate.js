exports.validate = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.query);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  };
};
