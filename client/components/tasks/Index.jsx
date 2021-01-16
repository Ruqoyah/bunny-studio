import React, { Component } from 'react';
import Header from '../common/Header';
import AddTask from './AddTask';
import UpdateTask from './UpdateTask';
import request from '../../actions/request';
import Loading from '../common/Loading';
import { validateInputFields } from '../../helper';


class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        title: '',
        description: '',
        user_id: this.props.match.params.userId
      },
      validationRes: {
        title: '',
        description: ''
      },
      taskUpdate: {
        title: '',
        description: ''
      }
    }
  }

  getUserTODOTasks = (userId) => {
    request(`users/${userId}/tasks?status=to-do`)
      .then(todoData => {
        this.setState((prev) => ({
          ...prev,
          loading: false,
          todoData
        }))
      })
  }

  getUserDoneTasks = (userId) => {
    request(`users/${userId}/tasks?status=done`)
      .then(doneData => {
        this.setState((prev) => ({
          ...prev,
          loading: false,
          doneData
        }))
      })
  }

  updateStatus = (event, taskId) => {
    const { value } = event.target
    this.setState((prev) => ({
      ...prev,
      loading: false
    }))
    request(`tasks/${taskId}/status`, { status: value }, 'put')
      .then(() => {
        this.setState((prev) => ({
          ...prev,
          loading: false
        }))
        const { userId } = this.props.match.params
        this.getUserTODOTasks(userId);
        this.getUserDoneTasks(userId)
      })
  }

  componentDidMount() {
    const { userId } = this.props.match.params
    this.getUserTODOTasks(userId);
    this.getUserDoneTasks(userId)
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState((prev) => ({
      ...prev,
      task: {
        ...prev.task,
        [name]: value
      }
    }))
  }

  onChangeUpdate = (event) => {
    const { name, value } = event.target;
    this.setState((prev) => ({
      ...prev,
      taskUpdate: {
        ...prev.taskUpdate,
        [name]: value
      }
    }))
  }

  reset = () => {
    this.setState((prev) => ({
      task: {
        ...prev.task,
        title: '',
        description: ''
      }
    }))
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { title, description } = this.state.task;
    const validationRes = validateInputFields({
      title,
      description
    });
    if (Object.keys(validationRes).length !== 0) {
      this.setState((prev) => ({
        ...prev,
        validationRes
      }))
      return;
    }

    this.setState((prev) => ({
      ...prev,
      loading: true
    }))

    request('tasks', this.state.task, 'post')
      .then((res) => {
        this.setState((prev) => ({
          ...prev,
          loading: false
        }))

        this.reset();

        this.addTaskToggleModal(event);

        const { userId } = this.props.match.params
        this.getUserTODOTasks(userId);
        this.getUserDoneTasks(userId);
      })
      .catch((error) => {
        this.setState((prev) => ({
          ...prev,
          loading: false,
          error: error.response.data.message
        }))
      })
  }

  onUpdate = (event) => {
    event.preventDefault()
    const { title, description } = this.state.taskUpdate;
    const validationRes = validateInputFields({
      title,
      description
    });
    if (Object.keys(validationRes).length !== 0) {
      this.setState((prev) => ({
        ...prev,
        validationRes
      }))
      return;
    }

    this.setState((prev) => ({
      ...prev,
      loading: true
    }))

    request(`tasks/${this.state.taskUpdate.id}`, this.state.taskUpdate, 'put')
      .then((res) => {
        this.setState((prev) => ({
          ...prev,
          loading: false
        }))

        this.updateTaskToggleModal(event)

        const { userId } = this.props.match.params
        this.getUserTODOTasks(userId);
        this.getUserDoneTasks(userId)
      })
      .catch((error) => {
        this.setState((prev) => ({
          ...prev,
          loading: false,
          error: error.response.data.message
        }))
      })
  }

  /**
* @description - handles the onFocus event
*
* @param  {object} event the event for the content field
*
* @return {void} no return or void
*
*/
  onFocus = (event) => {
    switch (event.target.name) {
      case 'title':
        this.setState((prev) => ({
          ...prev,
          validationRes: {
            ...prev.validationRes,
            title: '',
          },
          error: ''
        }));
        break;
      case 'description':
        this.setState((prev) => ({
          ...prev,
          validationRes: {
            ...prev.validationRes,
            description: '',
          },
          error: ''
        }));
    }
  }

  addTaskToggleModal = (event, id) => {
    if (id) {
      this.setState(() => ({ id }));
    }
    let modal = document.querySelector('.addTaskModal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
  };

  updateTaskToggleModal = (event, taskUpdate) => {
    if (taskUpdate) {
      this.setState((prev) => ({
        ...prev,
        taskUpdate: {
          ...prev.taskUpdate,
          title: taskUpdate.title,
          description: taskUpdate.description,
          id: taskUpdate.id
        }
      }));
    }
    let modal = document.querySelector('.updateTaskModal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none')
  }

  render() {
    const { doneData, todoData, loading, validationRes, error, task, taskUpdate } = this.state;
    return (
      <div>
        <Header
          location={this.props.location}
          userId={this.props.match.params.userId}
        />
        <div className="pt-24 md:pt-32 px-10 md:px-16 xl:px-32">
          <div className="block md:flex">
            <div className="flex-1 tasks md:mr-4 p-2 md:p-8 mb-8 md:mb-0">
              <div className="p-4 bg-red-600 text-white">TO-DO</div>

              {
                loading ? <Loading /> :

                  todoData && todoData.data && todoData.data.length < 1 ?
                    <div className="text-center my-24"> No TO-DO task found</div> :

                    todoData && todoData.data && todoData.data.map(todo => (
                      <div className="rounded-lg shadow-lg p-6 mb-4" key={todo.id}>
                        <div className="flex">
                          <h3 className="text-2xl flex-1">{todo.title}</h3>
                          {
                            localStorage.getItem('role') === 'super-admin' &&
                            <div className="flex-end">
                              <i className="fa fa-pencil-square-o cursor-pointer" aria-hidden="true"
                                onClick={(event) => this.updateTaskToggleModal(event, todo)}></i>
                            </div>
                          }
                        </div>

                        <p className="text-sm break-words">{todo.description}</p>
                        <div className="relative w-full mt-2">
                          <select
                            className="block appearance-none w-full bg-red-600 text-white border border-gray-400 cursor-pointer py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-red-600 focus:border-gray-500"
                            id="grid-state"
                            onChange={(event) => this.updateStatus(event, todo.id)}
                          >
                            <option className="font-medium" value="to-do">TO-DO</option>
                            <option className="font-medium" value="done">DONE</option>
                          </select>
                          <div className="pointer-events-none absolute right-0 flex inset-y-0 items-center px-2 text-white">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))
              }

            </div>
            <div className="flex-1 tasks p-2 md:p-8">
              <div className="p-4 bg-green-600 text-white">DONE</div>
              {
                loading ? <Loading /> :

                  doneData && doneData.data && doneData.data.length < 1 ?
                    <div className="text-center my-24"> No DONE task found</div> :

                    doneData && doneData.data && doneData.data.map(done => (
                      <div className="rounded-lg shadow-lg p-6 mb-4" key={done.id}>
                        <div className="flex">
                          <h3 className="text-2xl flex-1">{done.title}</h3>
                          {
                            localStorage.getItem('role') === 'super-admin' &&
                            <div className="flex-end">
                              <i className="fa fa-pencil-square-o cursor-pointer" aria-hidden="true"
                                onClick={(event) => this.updateTaskToggleModal(event, done)}></i>
                            </div>
                          }

                        </div>
                        <p className="text-sm break-words">{done.description}</p>
                        <div className="relative w-full mt-2">
                          <select
                            className="block appearance-none w-full bg-green-600 text-white border border-gray-400 cursor-pointer py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-green-800 focus:border-gray-500"
                            id="grid-state"
                            value="done"
                            onChange={(event) => this.updateStatus(event, done.id)}
                          >
                            <option className="font-medium" id="to-do" value="to-do">TO-DO</option>
                            <option className="font-medium" id="done" value="done">DONE</option>
                          </select>
                          <div className="pointer-events-none absolute right-0 flex inset-y-0 items-center px-2 text-white">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))
              }
            </div>
          </div>
        </div>

        {
          localStorage.getItem('role') === 'super-admin' &&
          <div className="plus rounded-full bg-primaryOrange w-16 h-16 ml-auto mr-8 md:mr-12 xl:mr-20 flex items-center cursor-pointer shadow-lg" onClick={(event) =>
            this.addTaskToggleModal(event)
          }>
            <p className="font-bold text-2xl text-white m-auto">+</p>
          </div>
        }

        <AddTask
          addTaskToggleModal={this.addTaskToggleModal}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          validationRes={validationRes}
          onFocus={this.onFocus}
          error={error}
          task={task}
        />

        <UpdateTask
          updateTaskToggleModal={this.updateTaskToggleModal}
          onChange={this.onChangeUpdate}
          onSubmit={this.onUpdate}
          validationRes={validationRes}
          onFocus={this.onFocus}
          error={error}
          taskUpdate={taskUpdate}
        />

      </div>

    )
  }
}

export default Tasks