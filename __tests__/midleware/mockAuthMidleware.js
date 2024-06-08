const mockAuthMiddleware = (userId, email = 'johndoe@example.com') => {
    return (req, res, next) => {
      req.pengguna = {
        id_pengguna: userId,
        email: email
      };
      next();
    };
  };
  
module.exports = mockAuthMiddleware;  