import React, { useEffect } from 'react';
import Footer from '../../components/footer';
import SelfPost from '../../components/myPost';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import { useDispatch, useSelector } from 'react-redux';
import { GetDonationPost, GetQueryPost } from '../../actions/postAction';

const MyPost = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isSignedIn);
  useEffect(() => {
    dispatch(GetDonationPost());
    dispatch(GetQueryPost());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <PageTitle pageTitle={'My Posts'} pagesub={'Posts'} />
      {auth ? <SelfPost /> : <p className='text-center py-5'>Please Login to view Your Posts</p>}
      <Footer />
    </div>
  );
};

export default MyPost;
