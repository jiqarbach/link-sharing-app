module.exports = (req, res, next) => {
  const { title, url, platform } = req.body;
  if (!title || !url || !platform) {
    return res.status(400).json({ error: 'Title, URL, and platform are required' });
  }
  try {
    new URL(url);
    next();
  } catch {
    return res.status(400).json({ error: 'Invalid URL format' });
  }
};
