import React, { createRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from '../loader';
import TalkJS from 'talkjs';
import './style.css';

function Inbox() {
  const { auth } = useSelector(({ auth }) => ({ auth }));
  const [me, setMe] = useState(null);
  const [session, setSession] = useState(null);
  const [inbox, setInbox] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const inboxView = createRef();

  useEffect(() => {
    if (auth.isSignedIn) {
      TalkJS.ready
        .then(() => {
          setMe(window.talkSession.me);
        })
    };
  }, [auth]);

  useEffect(() => {
    me !== null && setSession(window.talkSession);
  }, [me]);

  useEffect(() => {
    if (me !== null && inboxView.current && session !== null) {
      const Inbox = session.createInbox();
      Inbox.mount(inboxView.current);
      setInbox(Inbox);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [me, inboxView.current, session]);

  useEffect(() => {
    return () => {
      inbox !== null && inbox.destroy()
    }
  }, [inbox]);

  return (
    <div>
      {auth.isSignedIn ? (
        <div className='ChatBox-DTC my-4' ref={inboxView}>
          {isLoading ? (
            <Loader />
          ) : null}
        </div>
      ) : (
        <p className='text-center my-4'>
          You need to Login or Signup to view your inbox
        </p>
      )}
    </div>
  )
}

export default Inbox
