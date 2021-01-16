import React, { Component } from 'react';
import jsonwebtoken from 'jsonwebtoken';
import { setAuthorizationToken } from '../../helper'
/**
 * @class Authenticate
 *
 * @param  {object} PassedComponent the store state
 *
 * @classdesc authenticate user component
 *
 */
export default function Authenticate(ComposedComponent) {
/**
 * @class ProtectRoutes
 *
 * @classdesc Protect all Routes
 *
 */
  class AuthenticateUser extends Component {

    /**
   * @description - protect routes
   *
   * @return {void} no return or void
   */
  UNSAFE_componentWillMount = () => {
      const key = process.env.SUPER_SECRET;
      const token = localStorage.getItem('token');
      if (!token) {
        
        setAuthorizationToken(false);
        localStorage.removeItem('token')
        window.location = '/'

      } else if (token) {
        jsonwebtoken.verify(token, key, (error) => {
          if (error) {

            setAuthorizationToken(false);
            localStorage.removeItem('token')
            window.location = '/'
            
          }
        });
      }
    }
    /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  return AuthenticateUser;
}