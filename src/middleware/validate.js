export default function validate(validator) {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    next();
  };
}
