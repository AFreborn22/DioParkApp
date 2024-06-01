const mockMidlewareAdmin = (req, res, next) => {
    req.admin = {
      username: 'admin1', 
    };
    next();
  };
  
  module.exports = mockMidlewareAdmin;