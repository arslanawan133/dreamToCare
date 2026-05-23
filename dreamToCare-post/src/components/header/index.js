import React, { useEffect, useState } from 'react';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import HeaderTopbar from '../HeaderTopbar';
import MobileMenu from '../../components/MobileMenu';
import './style.css';
import TalkJS from 'talkjs';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from '../../actions/postAction';
import { initSocket, readNotificationAction } from '../../actions/socketInit';

const Header = (props) => {
  const [unreads, setUnreads] = useState(0);
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { auth, posts, gotNotification } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!!auth.isSignedIn) {
      initSocket(auth, dispatch);
    }
  }, [auth, dispatch]);

  useEffect(() => {
    posts.loading &&
      dispatch(stopLoadingAction());
  }, [dispatch, posts]);

  useEffect(() => {
    if (auth.isSignedIn) {
      TalkJS.ready.then(() => {
        const me = new TalkJS.User({
          id: auth.id,
          name: auth.name,
          email: auth.email,
          role: 'default'
        })
        const session = new TalkJS.Session({
          appId: "tJYfbumF",
          me: me,
        });
        session.setDesktopNotificationEnabled(true);
        window.talkSession = session;
        window.talkSession.unreads.on("change", (conversationIds) => {
          setUnreads(conversationIds.length)
        });
      });
    }
  }, [auth]);

  return (
    <div className={`middle-header ${props.ms2}`}>
      <HeaderTopbar />
      <div className='header-style-3'>
        <div className='container'>
          <div className='header-content'>
            <div className='row'>
              <div className='col-lg-3 col-md-8 col-sm-7 col-4'>
                <div className='logo'>
                  <Link onClick={ClickHandler} to='/' title=''>
                    <img src={Logo} alt='' />
                  </Link>
                </div>
              </div>
              <div className='col-lg-9 d-lg-block d-none'>
                <nav>
                  <ul>
                    <li>
                      <Link onClick={ClickHandler} to='/' title=''>
                        Home
                      </Link>
                    </li>
                    {!auth.isAdmin && <li>
                      <Link onClick={ClickHandler} to='/about' title=''>
                        About
                      </Link>
                    </li>}
                    <li>
                      <Link onClick={ClickHandler} to={!auth.isSignedIn ? '/donations' : !auth?.isAdmin ? '/my-post' : '/reported-posts'} title=''>
                        Post
                      </Link>
                      <ul onClick={() => dispatch(startLoadingAction)}>
                        {auth.isSignedIn && auth?.isAdmin ? <li>
                          <Link onClick={ClickHandler} to='/reported-posts' title=''>
                            Reported Posts
                          </Link>
                        </li> : <></>}
                        {auth.isSignedIn && <li>
                          <Link onClick={ClickHandler} to='/my-post' title=''>
                            My post
                          </Link>
                        </li>
                        }
                        <li>
                          <Link onClick={ClickHandler} to='/donations' title=''>
                            Donation Post
                          </Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to='/queries' title=''>
                            Queries
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to='/liveDastarkhuan' title=''>
                        Live Dastarkhuan
                      </Link>
                    </li>
                    {auth.isSignedIn && <li>
                      <Link onClick={() => { ClickHandler(); dispatch(readNotificationAction()) }} className="inbox notify" to='/notifications'>
                        {!!gotNotification ? <p className='badge-pill mb-0'></p> : null}
                        Notifications
                      </Link>
                    </li>}
                    {!auth.isAdmin && <li>
                      <Link onClick={ClickHandler} to='/contact' title=''>
                        Contact
                      </Link>
                    </li>}
                    {auth.isSignedIn && <li>
                      <Link onClick={ClickHandler} className="inbox" to='/inbox' title=''>
                        {unreads > 0 ? <p className='badge-pill mb-0'>{unreads}</p> : null}
                        <i className='fas fa-comment-alt'>
                        </i>
                      </Link>
                    </li>}
                    {auth.isSignedIn && <li>
                      <Link onClick={ClickHandler} to='/profile' title=''>
                        <i className='fas fa-user-alt'></i>
                      </Link>
                    </li>}
                  </ul>
                </nav>
              </div>

              <div className='col-md-2 col-sm-2 col-2 d-lg-none'>
                <MobileMenu />
              </div>
            </div>

            <div className='clearfix'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
