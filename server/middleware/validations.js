import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import models from '../models';

dotenv.config();

const { Users } = models;

/** Check if email already exist
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const validateUser = (req, res, next) => {
    Users
      .findOne({
        where: {
          email: req.body.email
        },
      })
      .then((user) => {
        if (user) {
          return res.status(409).json({
            status: false,
            message: 'email already exists'
          });
        } else {
            next();
        }
      });
  };

  /** Check if email is passed
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const checkUpdateRoleInput = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({
      status: false,
      message: 'Enter email'
    });
  }
  if (!req.body.name) {
    return res.status(400).json({
      status: false,
      message: 'Enter Name'
    });
  }
  if (!req.body.role) {
    return res.status(400).json({
      status: false,
      message: 'Input role to be updated'
    });
  }
  next();
};


  /** Check if login user is a super admin
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const validateSuperAdmin = (req, res, next) => {
  const { userId } = req.decoded.currentUser;
    Users
      .findOne({
        where: {
          id: userId
        },
      })
      .then((user) => {
        if (user.role === 'super-admin') {
         next()
        } else {
            return res.status(401).json({
                status: false,
                message: 'You don\'t have access to perform this operation'
            });
        }
      });
  };


  /** Check if user doesn't provide username and password
 * or if user input an incorrect password
 *
 * @param  {object} req - request
 *
 * @param  {object} res - response
 *
 * @param  {object} next - next
 *
 */

export const validateLoginUser = (req, res, next) => {
    if (!req.body.email) {
      return res.status(400).json({
        status: false,
        message: 'Please provide your email'
      });
    }
    if (!req.body.password) {
      return res.status(400).json({
        status: false,
        message: 'Please provide your password'
      });
    }
    Users
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            status: false,
            message: 'Invalid Credentials'
          });
        } else if (user) {
          bcrypt.compare(req.body.password, user.password, (err, response) => {
            if (response) {
              next();
            } else {
              return res.status(401).json({
                status: false,
                message: 'Invalid Credentials'
              });
            }
          });
        }
      });
  };