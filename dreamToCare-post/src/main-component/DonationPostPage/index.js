import React, { useEffect } from 'react';
import Footer from '../../components/footer';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import { useDispatch } from 'react-redux';
import { GetDonationPost } from '../../actions/postAction';
import DonationPosts from '../../components/DonationPosts';

const DonationPostsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDonationPost());
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
