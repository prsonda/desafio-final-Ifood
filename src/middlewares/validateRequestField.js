const validateRequestField = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).send({ mensagem: error.message });
    }
  };
};

module.exports = validateRequestField;
