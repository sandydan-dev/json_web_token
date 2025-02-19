const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  sign: async (payload, secret) => {
    try {
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      return token;
    } catch (error) {
      throw error;
    }
  },

  verify: async (token, secret) => {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      throw error;
    }
  },

//   comparePassword: async (password, hashedPassword) => {
//     try {
//       const isMatch = await bcrypt.compare(password, hashedPassword);
//       return isMatch;
//     } catch (error) {
//       throw error;
//     }
//   }
};