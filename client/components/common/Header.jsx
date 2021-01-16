import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { setAuthorizationToken } from '../../helper'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    logout = () => {
        setAuthorizationToken(false);
        localStorage.removeItem('token')
        window.location = '/'
    }

    render() {
        const { location } = this.props;
        return (
            <div className="header-wrapper absolute w-full px-10 md:px-16 xl:px-32">

                <div className="flex flex-wrap items-center mt-10 md:mt-12 text-xs md:text-base">
                    <div className="flex-auto">
                        {
                            location.pathname === '/' ? null :
                                <div className="w-24 md:w-32">
                                    <Link to="/"> <img src="images/bunny-studio.png" alt="logo" /></Link>
                                </div>
                        }
                    </div>
                    {
                        ((location.pathname === '/login') || (location.pathname === '/signup')) ? null :
                            <div className="text-right flex-initial font-bold text-gray-600">
                                <div className="flex">
                                <NavLink to="/users" activeClassName="nav-active" className="mr-8">
                                   <p>Users</p>
                                </NavLink>
                                <p className="cursor-pointer" onClick={this.logout}>Logout</p>
                                </div>
                            </div>
                    }


                </div>
            </div>
        )
    }
}

export default Header