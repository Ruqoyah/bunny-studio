import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div>
    <div className="text-center">
      <div> <img src="/images/404.gif"  className="m-auto"/> </div> <br/>
      <h1 className="text-xl md:text-4xl mb-6">Looks like you're lost</h1>
      <Link to="/">
        <button className="bg-primaryOrange text-white rounded-full py-2 md:px-4 mb-4 cursor-pointer w-24 md:w-32 focus:outline-none">Go to Home</button>
    </Link>
    </div>
  </div>
);

export default PageNotFound;