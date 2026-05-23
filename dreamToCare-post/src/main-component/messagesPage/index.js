/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetMessages } from '../../actions/messagesAction';
import Footer from '../../components/footer';
import Messages from '../../components/messages';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';

const MessagesPage = () => {
  const dispatch = useDispatch();
  const [byTime, setByTime] = useState("byDay");
  const [loaded, setLoaded] = useState(false);
  useEffect(async () => {
    await dispatch(GetMessages(byTime));
    setLoaded(true);
  }, [byTime]);
  return (
    <div>
      <Navbar />
      <PageTitle pageTitle={'Notifications'} pagesub={'notifications'} />
      <Messages loaded={loaded} byTime={byTime} changeTime={(value) => { setByTime(value); setLoaded(false) }} />
      <Footer />
    </div>
  );
};

export default MessagesPage;
