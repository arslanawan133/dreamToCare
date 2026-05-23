import React, { useEffect } from 'react';
import Footer from '../../components/footer';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import { useDispatch } from 'react-redux';
import { GetQueryPost } from '../../actions/postAction';
import QueryPosts from '../../components/QueryPosts';

const QueriesPostsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetQueryPost());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <PageTitle pageTitle={'Query Posts'} pagesub={'Queries'} />
      <QueryPosts />
      <Footer />
    </div>
  );
};

export default QueriesPostsPage;
