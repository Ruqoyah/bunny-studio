import express from 'express';
import UserController from '../controllers/UserController';
import TaskController from '../controllers/TaskController';
import {
    validateUser,
    validateLoginUser,
    validateSuperAdmin,
    checkUpdateRoleInput,
    checkUpdateInput
  } from '../middleware/validations';
import authentication from '../middleware/authentication';
const app = express.Router();


/** Add user
 * @param  {} '/api/users/signup'
 * @param  {} UserController.addUser
 */
app.post(
    '/api/users/signup', 
    authentication.authenticate,
    validateSuperAdmin,
    validateUser,
    UserController.addUser
);

/** signin user
 * @param  {} '/api/users/signin'
 * @param  {} UserController.signinUser
 */
app.post(
    '/api/users/signin', 
    validateLoginUser,
    UserController.signinUser
);

/** delete user
 * @param  {} '/api/users/:userId'
 * @param  {} UserController.deleteUser
 */
app.delete(
    '/api/users/:userId', 
    authentication.authenticate,
    validateSuperAdmin,
    UserController.deleteUser
);

/** update user
 * @param  {} '/api/users/:userId'
 * @param  {} UserController.updateUserRole
 */
app.put(
    '/api/users/:userId',
    authentication.authenticate,
    validateSuperAdmin,
    checkUpdateInput,
    UserController.updateUser
);

/** update user role
 * @param  {} '/api/users/role'
 * @param  {} UserController.updateUserRole
 */
app.put(
    '/api/users/role',
    authentication.authenticate,
    validateSuperAdmin,
    checkUpdateRoleInput,
    UserController.updateUserRole
);

/** get users
 * @param  {} '/api/users'
 * @param  {} UserController.getUsers
 */
app.get(
    '/api/users', 
    authentication.authenticate,
    validateSuperAdmin,
    UserController.getUsers
);

/** get user profile
 * @param  {} '/api/users/profile'
 * @param  {} UserController.getUser
 */
app.get(
    '/api/users/profile', 
    authentication.authenticate,
    UserController.getUser
);

/** Add Task
 * @param  {} '/api/tasks'
 * @param  {} TaskController.addTask
 */
app.post(
    '/api/tasks',
    authentication.authenticate,
    validateSuperAdmin,
    TaskController.addTask
);

/** Update Tasks
 * @param  {} '/api/tasks/:taskId'
 * @param  {} TaskController.updateTask
 */
app.put(
    '/api/tasks/:taskId',
    authentication.authenticate,
    validateSuperAdmin,
    TaskController.updateTask
);

/** Update Task Status
 * @param  {} '/api/tasks/:taskId/status'
 * @param  {} TaskController.updateTask
 */
app.put(
    '/api/tasks/:taskId',
    authentication.authenticate,
    TaskController.updateTaskStatus
);


/** Get Tasks
 * @param  {} '/api/tasks'
 * @param  {} TaskController.getTasks
 */
app.get(
    '/api/tasks',
    authentication.authenticate,
    validateSuperAdmin,
    TaskController.getTasks
);


/** Get User Tasks
 * @param  {} '/api/users/:userId/tasks'
 * @param  {} TaskController.getUserTasks
 */
app.get(
    '/api/users/:userId/tasks',
    authentication.authenticate,
    TaskController.getUserTasks
);

export default app;
