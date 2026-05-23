import React, { Fragment, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import HomeSection from '../../components/homesection';
import About from '../../components/about';
import CtaSection from '../../components/cta';
import Footer from '../../components/footer';
import Scrollbar from '../../components/scrollbar';
import abimg from '../../images/logo.png';
import hero1 from '../../images/slider/slide-1.jpg';
import QueryModal from '../../components/Modals/QueryModal';
import DonationModal from '../../components/Modals/DonationModal';
import { useDispatch, useSelector } from 'react-redux';
import { GetDonationPost, GetQueryPost, GetReportedPosts } from '../../actions/postAction';

const HomePage = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.isSignedIn) {
      if (auth.isAdmin) {
        dispatch(GetReportedPosts());
      }
      dispatch(GetDonationPost());
      dispatch(GetQueryPost());
    }
  }, [dispatch, auth]);
  return (
    <Fragment>
      <Navbar />
      <HomeSection Hero={hero1} />
      <About AbImg={abimg} />
      <CtaSection />
      <Footer />
      <Scrollbar />
      {auth.isSignedIn &&
        <>
          <DonationModal />
          <QueryModal />
        </>
      }
    </Fragment>
  );
};
export default HomePage;
