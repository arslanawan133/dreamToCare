/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { GetLocation } from '../../actions/locationsActions';
import Footer from '../../components/footer';
import Dastarkhuan from '../../components/livedastarkhuan';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';

const DastarkhuanPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetLocation());
  }, []);
  return (
    <div>
      <Navbar />
      <PageTitle pageTitle={'Live Dastarkhuan'} pagesub={'Dastarkhuan'} />
      <Dastarkhuan />
      <Footer />
    </div>
  );
};

export default DastarkhuanPage;
