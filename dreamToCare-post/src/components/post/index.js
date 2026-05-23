import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Post = () => {
  const auth = useSelector((state) => state.auth);
  return (
      <>
        <div className='d-flex align-items-center justify-content-center mt-4 btns'>
          <Link to={!auth.isSignedIn ? '/login' : ''} data-toggle='modal' data-target={auth.isSignedIn && '#donationModal'} className='theme-btn border-0 text-center'>
            Post For Donation
          </Link>
          <Link to={!auth.isSignedIn ? '/login' : ''} data-toggle='modal' data-target={auth.isSignedIn && '#queryModal'} className='theme-btn-s2 text-center small-btn'>
            Post For Query
          </Link>
        </div>
      </>
  );
};

export default Post;
