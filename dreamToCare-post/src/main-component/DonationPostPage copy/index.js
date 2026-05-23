import React, { useEffect } from 'react';
import Footer from '../../components/footer';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import { useDispatch, useSelector } from 'react-redux';
import { GetDonationPost, GetQueryPost } from '../../actions/postAction';
import DonationPosts from '../../components/QueryPosts';

const DonationPostsPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isSignedIn);
  useEffect(() => {
    dispatch(GetDonationPost());
    dispatch(GetQueryPost());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <PageTitle pageTitle={'Donation Posts'} pagesub={'Donations'} />
      <DonationPosts />
      <Footer />
    </div>
  );
};

export default DonationPostsPage;
