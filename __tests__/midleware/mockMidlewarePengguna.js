const mockMidlewarePengguna = (req, res, next) => {
  req.pengguna = {
    email: 'johndoe@example.com', 
  };

  console.log(req.pengguna)
  next();


};

module.exports = mockMidlewarePengguna;
