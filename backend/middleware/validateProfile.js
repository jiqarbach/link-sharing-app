module.exports = (req, res, next) => {
  const { first_name, last_name } = req.body;
  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'First and last name are required' });
  }
  next();
};
