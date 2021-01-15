import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <Header
                    location={this.props.location}
                />
                <div className="pt-24 md:pt-32 text-sm md:text-base">
              <form className="m-auto w-3/4 md:w-1/2 xl:w-1/3 shadow-lg bg-white p-6 md:p-10 text-center">
                <h2 className='md:text-lg'>LOGIN</h2>
                <input className="p-2 md:p-3 bg-gray-200 w-full mt-2 md:mt-4" type="text" placeholder="Email"/>
                <input className="p-2 md:p-3 bg-gray-200 w-full mt-2 md:mt-4" type="password" placeholder="Password"/>
                <button className="bg-primaryOrange w-full py-2 text-center text-white mt-3 md:text-lg hover:bg-orange-600">LOGIN</button>
              </form>
            </div>
            </div>
            
        )
    }
}

export default Login