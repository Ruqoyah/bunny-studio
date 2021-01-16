import models from '../models';

const { Tasks, Users } = models;

class TaskController {

  /** Add Task
    *
    * @param  {object} req - request
    * @param  {object} res - response
    *
  */

  static addTask(req, res) {
    Tasks.create(req.body)
      .then(addedTask => res.status(201).json({
        status: true,
        message: 'Task added successfully',
        data: addedTask
      }))
      .catch((error) => res.status(500).json({
        error
      }));
  }

  /** Modify Task
  *
  * @param  {object} req - request
  *
  * @param  {object} res - response
  *
  */
  static updateTask(req, res) {
    Tasks
      .findOne({
        where: {
          id: req.params.taskId
        }
      })
      .then(task => task
        .update({
          title: req.body.title || task.title,
          description: req.body.description || task.description,
          status: req.body.status || task.status,
          user_id: req.body.user_id || task.user_id
        })
        .then((editedTask) => {
          editedTask.reload().then(result => res.status(200).json({
            status: true,
            message: 'Task modified successfully!',
            data: result
          }));
        }))
      .catch((error) => res.status(500).json({
        error
      }));
  }

  /** Update Task Status
  *
  * @param  {object} req - request
  *
  * @param  {object} res - response
  *
  */
 static updateTaskStatus(req, res) {
  Tasks
    .findOne({
      where: {
        id: req.params.taskId
      }
    })
    .then(task => task
      .update({
        status: req.body.status || task.status
      })
      .then((editedTask) => {
        editedTask.reload().then(result => res.status(200).json({
          status: true,
          message: 'Task Status updated successfully!',
          data: result
        }));
      }))
    .catch((error) => res.status(500).json({
      error
    }));
}


  /** Get Tasks
   *
   * @param  {object} req - request
   * @param  {object} res - response
   *
   */

  static getTasks(req, res) {
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
      Tasks
        .findAndCountAll({
          order: [['createdAt', 'DESC']],
          limit,
          offset,
          include: [{
            model: Users
          }],
        })
        .then((tasks) => {
          const pages = Math.ceil(galleries.count / limit);
          return res.status(200).json({
            status: true,
            tasks,
            pages
          });
        })
        .catch((error) => res.status(500).json({
          error
        }));
    } else {
      Tasks
        .findAll({
          order: [['createdAt', 'DESC']],
          include: [{
            model: Users
          }],
        })
        .then((tasks) => {
          return res.status(200).json({
            status: true,
            tasks
          });
        })
        .catch((error) => res.status(500).json({
          error
        }));
    }
  }

  /** Get Tasks for a specific user
    *
    * @param  {object} req - request
    *
    * @param  {object} res - response
    *
    */
  static getUserTasks(req, res) {
    return Tasks
      .findAll({
        where: {
          user_id: req.params.userId
        }
      })
      .then(result => res.status(200).json({
        status: true,
        data: result
      }))
      .catch((error) => res.status(500).json({
        error
      }));
  }
}



export default TaskController;