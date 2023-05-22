const setCorsHeaders = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your specific domain or origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  };