import React, { useEffect } from 'react';
import Footer from '../../components/footer';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import { useDispatch } from 'react-redux';
import { GetQueryPost } from '../../actions/postAction';
import MainPost from '../../components/MainPost';

const OpenPostsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetQueryPost());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <PageTitle pageTitle={'Post'} pagesub={'Post'} />
      <MainPost />
      <Footer />
    </div>
  );
};

export default OpenPostsPage;
