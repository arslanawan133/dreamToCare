import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../loader';
import placeholder from '../../images/placeholder.png';
import { useEffect } from 'react';
import {GetDonationPost} from "../../actions/postAction";

const DonationPosts = () => {
  const { donationPost, isLoading, auth } = useSelector((state) => ({
    isLoading: state.posts.loading,
    auth: state.auth,
    donationPost: state.posts.donationPost,
  }));
  const [searchPost, setSearchPost] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div className='tp-donation-page-area section-padding'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4 mx-auto pb-4'>
            <input
              className='form-control'
              type='text'
              placeholder='Search here...'
              style={{ background: '#202120', color: 'white' }}
              onChange={(e) => setSearchPost(e.target.value)}
            />
          </div>
          <div className='col-lg-8 offset-lg-2'>
            <div className='tp-donate-header'>
              <h2>Donation Posts</h2>
            </div>
            <select
              className='form-control ml-5'
              value={category}
              style={{ background: '#202120', color: 'white', width: '200px' }}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value=''>
                Select Category
              </option>
              <option>Household Items</option>
              <option>Electronics</option>
            </select>
            {isLoading ? (
              <Loader />
            ) : (
              <div className='features-area features-area-2'>
                <div className='container-fluid'>
                  <div className='row'>
                    {donationPost.length ? (
                      donationPost
                        .filter((e) => e.title.toLowerCase().includes(searchPost.toLowerCase()))
                        .filter((e) => e.category.includes(category))
                        .map((e, i) => (
                          <div key={i} className='col-lg-4 col-md-6 col-12'>
                            <div className='features-item-2'>
                              <Link to={`/post/${e._id}`}>
                                <div className='features-icon'>
                                  <img className='' style={{ height: '200px' }} src={!!e.image ? e.image : placeholder} alt='' />
                                </div>
                                <div className='features-content'>
                                  <h3>{e.title}</h3>
                                  <p>{e.category}</p>
                                  <p>{e.description}</p>
                                </div>
                              </Link>
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className='text-center'>No Donation is available</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPosts;
