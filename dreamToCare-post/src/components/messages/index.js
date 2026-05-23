import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TalkJS from 'talkjs';
import './style.css';
import Loader from '../loader'

const Messages = ({ byTime, changeTime, loaded }) => {
  const { auth, messages } = useSelector((state) => ({
    messages: state.messages,
    auth: state.auth
  }));
  const [me, setMe] = useState(null);
  const [other, setOther] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [session, setSession] = useState(null);
  const [popup, setPopup] = useState(null);

  function formatDate(dateVal) {
    var newDate = new Date(dateVal);

    var sMonth = padValue(newDate.getMonth() + 1);
    var sDay = padValue(newDate.getDate());
    var sYear = newDate.getFullYear();
    var sHour = newDate.getHours();
    var sMinute = padValue(newDate.getMinutes());
    var sAMPM = "AM";

    var iHourCheck = parseInt(sHour);

    if (iHourCheck > 12) {
      sAMPM = "PM";
      sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
      sHour = "12";
    }

    sHour = padValue(sHour);

    return sDay + "-" + sMonth + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
  }
  function padValue(value) {
    return (value < 10) ? "0" + value : value;
  }

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('receiver')) {
        !!popup && popup.destroy();
        setPopup(null);
        setConversation(null);
        setOther(
          new TalkJS.User({
            id: e.target.getAttribute('uid'),
            name: e.target.getAttribute('uname'),
            email: e.target.getAttribute('uemail'),
            role: 'query'
          })
        );
      }
    });
  }, [popup]);

  useEffect(() => {
    if (auth.isSignedIn) {
      TalkJS.ready
        .then(() => {
          setMe(window.talkSession.me);
        })
    };
  }, [auth]);

  useEffect(() => {
    if (me !== null) {
      setSession(
        window.talkSession
      );
    }

  }, [me]);


  useEffect(() => {
    if (me !== null && other !== null && session !== null) {
      const conversationId = TalkJS.oneOnOneId(me, other);
      setConversation(session.getOrCreateConversation(conversationId));
    }

  }, [me, other, session]);


  useEffect(() => {
    if (other !== null && conversation !== null && popup === null) {
      conversation.setParticipant(me);
      conversation.setParticipant(other);
      const popup = session.createPopup();
      popup.select(conversation);
      popup.mount({ show: true });
      setPopup(popup);
    }

  }, [me, session, other, conversation, popup]);


  useEffect(() => {
    !!popup && popup.onClose(() => popup.destroy());
    return () => {
      popup !== null && popup.destroy()
    }
  }, [popup]);

  return (
    <div className='container my-5'>
      <div className='row mb-3'>
        <div className='col-md-3 ml-auto'>
          <select
            className='form-control'
            name='byTime'
            value={byTime}
            onChange={(e) => changeTime(e.target.value)}
          >
            <option value={"byDay"}>
              Today
            </option>
            <option value={"byWeek"}>
              This Week
            </option>
            <option value={"byMonth"}>
              This Month
            </option>
          </select>
        </div>
      </div>
      <div className='row'>
        {loaded || messages.length ? (
          messages.map((e, i) => (
            <div key={i} className={i === messages.length - 1 && i % 2 === 0 ? 'my-2 col-md-12' : 'my-2 col-md-6'}>
              <li className='list-group-item h-100  d-flex justify-content-between align-items-start' style={{ background: '#1E1E1E', color: 'white' }}>
                <div className='ms-2 me-auto w-100'>
                  <div className='fw-bold'>
                    {e.message.includes('sent')
                      ? 'Received'
                      : e.message.includes('your payment has been received')
                        ? 'Donated'
                        : e.message.includes('reported') && e.message.includes('query')
                          ? 'Reported Query'
                          : e.message.includes('reported') && e.message.includes('post')
                            ? 'Reported Donation'
                            : 'Donation'}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: e.message }}>

                  </div>
                  <p className='d-flex align-items-center justify-content-end text-muted mb-0'>{formatDate(e.createdAt)}</p>
                </div>
              </li>
            </div>
          ))
        ) : (
          <p>No Notification</p>
        )}
      </div>
      {!loaded && <div className='row'>
        <div className='col'>
          <Loader />
        </div>
      </div>}
    </div>
  );
};

export default Messages;
