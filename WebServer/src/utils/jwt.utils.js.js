import jwt from 'jsonwebtoken';

const SECRET_APP = 'f646PXtbWtPUuCXtxeVpgcATUrsjYJZg4eUdUyWEyKwDLfnwNtWVf6gxJSVcun2dS8s4uZEZVwV3UqKX3yyhL9aBmfQJXbctVZGSWcHKV58FmS9PFmXW7zQtT6N2BPDJn9FAwFeaVBn4U9tkv2KrtzVYj67Rm2CKHgkUwW3NyF3bYHfABLC4BQk8ZUdPDD9kvS6nSHhvejz3WKaXJByh6rBSnnVHj8pA5yqJQcbUNbat5eJcz3H9L8gR3GUa3Nus';

export const generateTokenForUser = (userId) => jwt.sign({
  userid: userId,
}, SECRET_APP, { expiresIn: '24h' });

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_APP);
    return decoded.userid;
  } catch (error) {
    return null;
  }
};
