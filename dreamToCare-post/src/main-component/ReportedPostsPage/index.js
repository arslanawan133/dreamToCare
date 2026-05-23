import React, { useEffect } from 'react';
import Footer from '../../components/footer';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import { useDispatch } from 'react-redux';
import { GetReportedPosts } from '../../actions/postAction';
import ReportedPosts from '../../components/reportedPosts';

const ReportedPostsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetReportedPosts());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <PageTitle pageTitle={'Reported Posts'} pagesub={'Reported'} />
      <ReportedPosts />
      <Footer />
    </div>
  );
};

export default ReportedPostsPage;
