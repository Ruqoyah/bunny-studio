import models from '../models';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import omit from 'object.omit';

const { Users } = models;

dotenv.config();
const secret = process.env.SUPER_SECRET;
const saltRounds = 10;

class UserController {

  /** Add User
    *
    * @param  {object} req - request
    * @param  {object} res - response
    *
  */

  static addUser(req, res) {
    bcrypt.hash(req.body.password, saltRounds)
      .then((hash) => {
        Users.create({
          name: req.body.name,
          email: req.body.email,
          password: hash
        })
          .then((user) => {
            res.status(201).json({
              status: true,
              message: 'You have successfully added a user',
              data: { role: user.role, email: user.email }
            });
          })
          .catch(() => res.status(500).json({
            error: 'Internal sever Error'
          }));
      });
  }

  /** Signin user
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   */

  static signinUser(req, res) {
    return Users
      .findOne({
        where: { email: req.body.email }
      })
      .then((user) => {
        const currentUser = {
          userId: user.id
        };
        const token = jsonwebtoken.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
          currentUser
        },
          secret);
        res.status(200).json({
          status: true,
          message: 'You have successfully signed in!',
          data: { token, role: user.role, email: user.email, userId: user.id }
        });
      });
  }

  /** Modify User
  *
  * @param  {object} req - request
  *
  * @param  {object} res - response
  *
  */
 static updateUser(req, res) {
  Users
    .findOne({
      where: {
        id: req.params.userId
      }
    })
    .then(user => user
      .update({
        name: req.body.name || task.name,
        email: req.body.email || task.email,
      })
      .then((editedUser) => {
        editedUser.reload().then(result => res.status(200).json({
          status: true,
          message: 'User modified successfully!',
          data: result
        }));
      }))
    .catch((error) => res.status(500).json({
      error
    }));
}


  /** Delete User
   *
   * @param  {object} req - request
   * @param  {object} res - response
   *
   * @return {object} returns an object
   *
   */
  static deleteUser(req, res) {
    return Users
      .destroy({
        where: {
          id: req.params.userId
        }
      })
      .then(() => {
        res.status(200).json({
          status: true,
          message: 'User deleted successfully!',
          data: {
            id: Number(req.params.userId)
          }
        });
      })
      .catch((error) => res.status(500).json({
        error
      }));
  }

  /** Grant User access
   *
   * @param  {object} req - request
   * @param  {object} res - response
   *
   * @return {object} returns an object
   *
   */
  static updateUserRole(req, res) {
    return Users
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => user
        .update({ role: req.body.role })
        .then((editedUser) => {
          editedUser.reload().then(result => res.status(200).json({
            status: true,
            message: 'User role updated successfully!',
            data: omit(result.dataValues, ['password'])
          }));
        }))
      .catch((error) => res.status(500).json({
        error
      }));
  }

  /** Get Users
   *
   * @param  {object} req - request
   * @param  {object} res - response
   *
   */

  static getUsers(req, res) {
    const { query } = req;
    if (query.page || query.limit) {
      const pageNumber = Number(query.page) || 1;
      const limit = Number(query.limit) || 5;
      let offset;
      let page;
      if (pageNumber === 0) {
        offset = 0;
      } else {
        page = pageNumber;
        offset = limit * (page - 1);
      }
      Users
        .findAndCountAll({
          order: [['createdAt', 'DESC']],
          limit,
          offset,
        })
        .then((users) => {
          const pages = Math.ceil(users.count / limit);
          return res.status(200).json({
            status: true,
            users: users.rows.map(user => omit(user.dataValues, ['password'])),
            pages,
            count: users.count
          });
        })
        .catch((error) => res.status(500).json({
          error
        }));
    } else {
      Users
        .findAll({
          order: [['createdAt', 'DESC']],
        })
        .then((users) => {
          return res.status(200).json({
            status: true,
            users: users.map(user => omit(user.dataValues, ['password']))
          });
        })
        .catch((error) => res.status(500).json({
          error
        }));
    }
  }

  /** Get User
     * @param  {object} req - request
     *
     * @param  {object} res - response
     *
     * @return {object} returns an object
     *
     */
  static getUser(req, res) {
    const { userId } = req.decoded.currentUser;
    return Users
      .findOne({
        where: { id: userId }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: 'user does not exist'
          });
        }
        return res.status(200).json({
          status: true,
          data: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        });
      })
      .catch(() => res.status(500).json({
        error: 'Internal sever Error'
      }
      ));
  }
}


export default UserController;