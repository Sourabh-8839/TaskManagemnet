import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
    let token =
      req.cookies?.accesstoken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRETKEY
      );

      console.log(token);
      const resp = await User.findById(decodedToken._id);

      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedToken._id,
      };

      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ status: false, message: error.message });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: 'Not authorized as admin. Try login as admin.',
    });
  }
};

export { isAdminRoute, protectRoute };
