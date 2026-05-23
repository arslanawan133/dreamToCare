import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../actions/authAction';

const HeaderTopbar = () => {
  const dispatch = useDispatch();
  const { isSignedIn } = useSelector((state) => ({
    isSignedIn: state.auth.isSignedIn,
  }));

  const handleLogout = () => {
    dispatch(logoutAction());
    window.location.href = '/';
  };

  return (
    <div className='topbar'>
      <div className='container'>
        <div className='row'>
          <div className='col col-md-6 col-sm-12 col-12'></div>
          <div className='col col-md-6 col-sm-12 col-12'>
            <div className='contact-info'>
              <ul>
                {!isSignedIn && (
                  <>
                    <li>
                      <Link to='/login'>Login</Link>
                    </li>
                    <li>
                      <Link to='/signup'>Sign Up</Link>
                    </li>
                  </>
                )}

                {isSignedIn && (
                  <>
                    <li>
                      <a href='/logout' onClick={(e) => {e.preventDefault(); handleLogout()}}>Logout</a>
                    </li>
                    <li></li>
                  </>
                )}
                <li>
                  {/* <Link className='theme-btn' to='/donate'>
                    Donate Now
                  </Link> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTopbar;
