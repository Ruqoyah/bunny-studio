import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Homepage extends Component {
    componentDidMount() {
        if (localStorage.getItem('token')) {
          if(localStorage.getItem('role') === 'super-admin') {
            this.props.history.push('/users');
          } else {
            this.props.history.push('/tasks');
          }
        }
      }
    render() {
        return (
            <div>
                <div className="text-center mt-32 md:mt-20 relative z-50">
                <img src="/images/bunny-studio.png" alt="logo" className="w-2/3 md:w-3/12 m-auto"/>
                <div className="mt-10">
                    <Link to="/login">
                        <button className="bg-primaryOrange text-white rounded-full py-2 md:px-4 mb-4 cursor-pointer w-24 md:w-32 focus:outline-none">Login</button>
                    </Link>
                </div>
                </div>
                <div className="bottom-0 absolute homepage-img-wrapper">
                    <img src="images/homepage.jpg" alt="homepage" className="w-full md:w-9/12 m-auto"/>
                </div>
            </div>
        )
    }
}

export default Homepage;
