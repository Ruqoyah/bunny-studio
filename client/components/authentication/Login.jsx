import React, { Component } from 'react';
import Header from '../common/Header';
import request from '../../actions/request';
import { validateInputFields, setAuthorizationToken } from '../../helper'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      validationRes: {
        email: '',
        password: ''
      },
      user: {
        email: '',
        password: ''
      }
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      if(localStorage.getItem('role') === 'super-admin') {
        this.props.history.push('/users');
      } else {
        this.props.history.push(`/users/${this.state.userId}/tasks`);
      }
    }
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

  onSubmit = (event) => {
    event.preventDefault()
    const { email, password } = this.state.user;
    const validationRes = validateInputFields({
      email,
      password
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

    request('users/signin', this.state.user, 'post')
      .then((res) => {
        this.setState((prev) => ({
          ...prev,
          loading: false, 
          userId: res.data.userId
        }))

        setAuthorizationToken(res.data.token)
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('userId', res.data.userId);

        if(res.data.role ===  'super-admin') {
          this.props.history.push('/users')
        } else {
          this.props.history.push(`/users/${res.data.userId}/tasks`)
        }
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
      case 'password':
        this.setState((prev) => ({
          ...prev,
          validationRes: {
            ...prev.validationRes,
            password: ''
          },
          error: ''
        }));
    }
  }

  render() {
    const { validationRes, loading, error } = this.state;
    return (
      <div>
        <Header
          location={this.props.location}
        />
        <div className="pt-24 md:pt-32 text-sm md:text-base">
          <form className="m-auto w-3/4 md:w-1/2 xl:w-1/3 shadow-lg bg-white p-6 md:p-10 text-center" onSubmit={this.onSubmit}>
            <h2 className='md:text-lg'>LOGIN</h2>
            <input 
              className="p-2 md:p-3 bg-gray-200 w-full mt-2 md:mt-4" 
              type="text" 
              placeholder="Email" 
              name="email" 
              onChange={this.onChange} 
              onFocus={this.onFocus}
            />
            {validationRes && validationRes.email ? (
              <p className="text-red-500 text-left text-sm italic mt-2">
                {validationRes.email}
              </p>
            ) : null}
            <input
              className="p-2 md:p-3 bg-gray-200 w-full mt-2 md:mt-4"
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.onChange}
              onFocus={this.onFocus}
            />
            {validationRes && validationRes.password ? (
              <p className="text-red-500 text-left text-sm italic mt-2">
                {validationRes.password}
              </p>
            ) : null}
             {error ? (
              <p className="text-red-500 text-left text-sm italic mt-2">
                {error}
              </p>
            ) : null}
            <button 
              type="submit" 
              className={
                `${
                  loading && "opacity-50 cursor-not-allowed"
                } bg-primaryOrange w-full py-2 text-center text-white mt-3 md:text-lg hover:bg-orange-600`}
              >
                {
                  loading ?  <i className="fa fa-spinner fa-pulse"></i> : "LOGIN"
                }
              </button>
          </form>
        </div>
      </div>

    )
  }
}

export default Login