import React from 'react';
import Footer from '../../components/footer';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import Profile from '../../components/Profile';

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <PageTitle pageTitle={'Query Posts'} pagesub={'Queries'} />
      <Profile />
      <Footer />
    </div>
  );
};

export default ProfilePage;
