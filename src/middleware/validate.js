const jwt = require('jsonwebtoken');
const respon = require('../Helpers/respon');

// eslint-disable-next-line consistent-return
const checkToken = (role) => (req, res, next) => {
  const { authtoken } = req.headers;
  let isAcc = false;

  if (!authtoken) {
    return respon(res, 209, { msg: 'Login dulu!' });
  }

  jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode) => {
    if (err) {
      return respon(res, 209, err);
    }
    // eslint-disable-next-line array-callback-return
    role.map((value) => {
      if (value === decode.role) {
        isAcc = true;
      }
    });
    if (isAcc) {
      return next();
    }
    return respon(res, 209, { msg: 'Not Found' });
  });
};

module.exports = checkToken;
