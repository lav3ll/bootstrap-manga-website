// user-agent.middleware.js

const userAgentMiddleware = (req, res, next) => {
  // Add User-Agent header
  req.headers['User-Agent'] = 'Your-User-Agent-String';

  // Check for the absence of Via header
  if (req.headers.via) {
    // If Via header is present, return an error
    return res
      .status(403)
      .json({ error: 'Non-transparent proxies are not allowed' });
  }

  // Proceed to the next middleware
  next();
};

module.exports = userAgentMiddleware;
