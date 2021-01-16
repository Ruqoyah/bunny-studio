import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Paginate from '../common/Paginate';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import request from '../../actions/request';
import Loading from '../common/Loading';
import { validateInputFields } from '../../helper';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      user: {
        email: '',
        name: '',
        password: '',
        cpassword: ''
      },
      validationRes: {
        email: '',
        name: '',
        password: '',
        cpassword: ''
      },
    }
  }

  toggleModal = (event, userId) => {
    if (userId) {
      this.setState(() => ({ userId }));
    }
    let modal = document.querySelector('.deleteModal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
  };

  editToggleModal = (event, userUpdate) => {
    if (userUpdate) {
      this.setState((prev) => ({ 
        ...prev,
        userUpdate: {
          ...prev.userUpdate,
          name: userUpdate.name,
          email: userUpdate.email,
          id: userUpdate.id
        }
      }));
    }
    let modal = document.querySelector('.editModal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
  };

  addUserToggleModal = (event, id) => {
    if (id) {
      this.setState(() => ({ id }));
    }
    let modal = document.querySelector('.addUserModal');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
  };

  getUsers = (pageNumber) => {
    request(`api/users?limit=15&page=${pageNumber}`)
    .then(data => {
      this.setState((prev) => ({
        ...prev,
        loading: false,
        data
      }))
    })
  }

  componentDidMount() {
    this.setState((prev) => ({
      ...prev,
      loading: true
    }))
   this.getUsers(this.state.activePage)
  }

  handlePageChange = (pageNumber) => {
    this.setState((prev) => ({
      ...prev,
      activePage: pageNumber,
      loading: true
    }))
    this.getUsers(pageNumber)
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value
      }
    }))
  }

  onChangeUpdate = (event) => {
    const { name, value } = event.target;
    this.setState((prev) => ({
      ...prev,
      userUpdate: {
        ...prev.userUpdate,
        [name]: value
      }
    }))
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { email, password, name, cpassword } = this.state.user;
    const validationRes = validateInputFields({
      email,
      name,
      password,
      cpassword
    });
    if (Object.keys(validationRes).length !== 0) {
      this.setState((prev) => ({
        ...prev,
        validationRes
      }))
      return;
    }

    if (!this.state.passwordConfirmError) {
      this.setState((prev) => ({
        ...prev,
        loading: true
      }))

      request('api/users/signup', this.state.user, 'post')
        .then((res) => {
          this.setState((prev) => ({
            ...prev,
            loading: false
          }))
          this.addUserToggleModal(event)
          this.getUsers(this.state.activePage)
        })
        .catch((error) => {
          this.setState((prev) => ({
            ...prev,
            loading: false,
            error: error.response.data.message
          }))
        })
    }
  }

  onUpdate = (event) => {
    event.preventDefault()
    const { email, name } = this.state.userUpdate;
    const validationRes = validateInputFields({
      email,
      name
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

    request(`api/users/${this.state.userUpdate.id}`, this.state.userUpdate, 'put')
      .then((res) => {
        this.setState((prev) => ({
          ...prev,
          loading: false
        }))
        this.editToggleModal(event)
        this.getUsers(this.state.activePage)
      })
      .catch((error) => {
        this.setState((prev) => ({
          ...prev,
          loading: false,
          error: error.response.data.message
        }))
      })
  }

  onDelete = () => {
    this.setState((prev) => ({
      ...prev,
      disableBtn: true
    }))
    request(`api/users/${this.state.userId}`, null, 'delete')
      .then(() => {
        this.setState((prev) => ({
          ...prev,
          disableBtn: false
        }))
        this.toggleModal()
        this.getUsers(this.state.activePage)
      })
  }

  /**
   * @description - handles the onBlur event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void} no return or void
   *
   */
  onBlur = (event) => {
    switch (event.target.name) {
      case 'cpassword':
        if (event.target.value !== this.state.user.password) {
          this.setState((prev) => ({
            passwordConfirmError: 'Password does not match',
          }));
        } else {
          this.setState((prev) => ({ passwordConfirmError: '' }));
        }
    }
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
      case 'email':
        this.setState((prev) => ({
          ...prev,
          validationRes: {
            ...prev.validationRes,
            email: '',
          },
          error: ''
        }));
        break;
      case 'name':
        this.setState((prev) => ({
          ...prev,
          validationRes: {
            ...prev.validationRes,
            name: '',
          },
          error: ''
        }));
        break;
      case 'password':
        this.setState((prev) => ({
          ...prev,
          validationRes: {
            ...prev.validationRes,
            password: ''
          },
          error: ''
        }));
        break;
      case 'cpassword':
        this.setState((prev) => ({
          ...prev,
          validationRes: {
            ...prev.validationRes,
            cpassword: '',
            passwordConfirmError: ''
          },
          error: ''
        }));
    }
  }


  render() {
    const { 
      disableBtn, 
      activePage, 
      data, 
      loading, 
      validationRes, 
      passwordConfirmError, 
      error,
      userUpdate
    } = this.state;
    return (
      <div>
        <Header
          location={this.props.location}
        />
        <div className="pt-24 md:pt-32 px-10 md:px-16 xl:px-32">
          <div className="md:flex font-bold text-lg bg-primaryBlue text-white py-4 px-4 hidden">
            <div className="flex-initial w-1/4">Name</div>
            <div className="flex-initial w-1/3">Email</div>
            <div className="flex-initial w-5/12">Action</div>
          </div>

          {
            loading ? <Loading /> :

              data && data.users.map(user => (
                <div className="block md:flex border rounded p-4 mt-4 shadow-lg items-center" key={user.id}>
                  <label className="font-bold block md:hidden">Name:</label>
                  <div className="flex-initial w-full md:w-1/4 break-words mb-3 md:mb-0">{user.name}</div>
                  <label className="font-bold block md:hidden">Email:</label>
                  <div className="flex-initial w-full md:w-1/3 break-words mb-3 md:mb-0">{user.email}</div>
                  <div className="flex-initial w-full md:w-5/12 text-sm md:text-base">
                    <button className="bg-primaryBlue text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mr-2"
                      onClick={(event) =>
                        this.editToggleModal(event, user)
                      }>Update</button>
                    <button className="bg-red-600 text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mr-2 mt-2 lg:mt-0"
                      onClick={(event) =>
                        this.toggleModal(event, user.id)
                      }>Delete</button>
                    <Link to="/tasks">
                      <button className="bg-primaryOrange text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mt-2 lg:mt-0">Task(s)</button>
                    </Link>
                  </div>
                </div>
              ))
          }

          <div className="my-16 md:my-24">
            {
              data && <Paginate
                totalData={data.count}
                perPage={15}
                handlePageChange={this.handlePageChange}
                activePage={activePage}
                dataCount={data.pages}
              />
            }
          </div>
        </div>

        <AddUser
          addUserToggleModal={this.addUserToggleModal}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          validationRes={validationRes}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          passwordConfirmError={passwordConfirmError}
          error={error}
        />
        <UpdateUser
          editToggleModal={this.editToggleModal}
          onUpdate={this.onUpdate}
          validationRes={validationRes}
          onFocus={this.onFocus}
          userUpdate={userUpdate}
          onChangeUpdate={this.onChangeUpdate}
          error={error}
        />
        <DeleteUser
          toggleModal={this.toggleModal}
          disableBtn={disableBtn}
          onDelete={this.onDelete}
        />

        <div className="plus rounded-full bg-primaryOrange w-16 h-16 ml-auto mr-8 md:mr-12 xl:mr-20 flex items-center cursor-pointer shadow-lg" onClick={(event) =>
          this.addUserToggleModal(event)
        }>
          <p className="font-bold text-2xl text-white m-auto">+</p>
        </div>
      </div>

    )
  }
}

export default Users