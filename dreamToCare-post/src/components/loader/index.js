import React from 'react';
import loader from '../../images/loader.gif';

const Loader = ({className}) => {
  return (
    <div className="container-fluid">
      <div className={!className ? 'd-flex justify-content-center my-3' : className}>
        <img src={loader} style={{ height: '50px' }} alt='Loading...' />
      </div>
    </div>
  );
};

export default Loader;
