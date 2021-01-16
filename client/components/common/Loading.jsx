import React from 'react';

const Loading = () => (
  <div className="py-16 md:py-48 text-center">
    <div className="text-4xl md:text-5xl">
      <i className="fa fa-spinner fa-pulse"></i>
    </div>
    <div className="font-semibold text-sm text-primary-deep-gray italic">
      loading...
    </div>
  </div>
);

export default Loading;