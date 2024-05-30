const mockAuthMiddleware = (req, res, next) => {
    req.pengguna = {
      id: 1,
      email: 'johndoe@example.com',
    };
    next();
};

module.exports = mockAuthMiddleware;