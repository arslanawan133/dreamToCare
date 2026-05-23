import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../loader';
import DonationModal from '../Modals/DonationModal';
import QueryModal from '../Modals/QueryModal';
import { useDispatch } from 'react-redux';
import { DeleteDonationPost, DeleteQueryPost } from '../../actions/postAction';
import placeholder from '../../images/placeholder.png';

const MyPost = () => {
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const [donationData, setDonationData] = useState({ image: '', title: '', category: '', description: '' });
  const [queryData, setQueryData] = useState({ image: '', title: '', category: '', description: '' });
  const [donationId, setDonationId] = useState('');
  const [queryId, setQueryId] = useState('');
  const { donationPost, queryPost, isLoading } = useSelector((state) => ({
    isLoading: state.posts.loading,
    donationPost: state.posts.donationPost.filter((e) => e.creator._id === userId),
    queryPost: state.posts.queryPost.filter((e) => e.creator._id === userId),
  }));

  const handleDonationData = (e) => {
    setDonationData({ image: e.image, title: e.title, category: e.category, description: e.description });
    setDonationId(e._id);
  };

  const handleQueryData = (e) => {
    setQueryData({ image: e.image, title: e.title, category: e.category, description: e.description });
    setQueryId(e._id);
  };

  const handleDeleteDonation = (e) => {
    dispatch(DeleteDonationPost(e._id));
  };

  const handleDeleteQuery = (e) => {
    dispatch(DeleteQueryPost(e._id));
  };

  return (
    <div className='tp-donation-page-area section-padding'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-8 offset-lg-2'>
            <div className='tp-donate-header'>
              <h2>Post For Donation</h2>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className='features-area features-area-2'>
                <div className='container-fluid'>
                  <div className='row'>
                    {donationPost.length ? (
                      donationPost.map((e, i) => (
                        <div key={i} className='col-lg-4 col-md-6 col-12'>
                          <div className='features-item-2'>
                            <div className='features-icon'>
                              <img className='' style={{ height: '200px' }} src={!!e.image ? e.image : placeholder} alt='' />
                            </div>
                            <div className='features-content'>
                              <h3>{e.title}</h3>
                              <p>{e.category}</p>
                              <p>{e.description}</p>
                            </div>
                            <div className='dropdown d-flex justify-content-end mt-2 pr-3'>
                              <button
                                className='btn btn-dark'
                                id='dropdownMenuLink'
                                data-toggle='dropdown'
                                aria-expanded='false'
                              >
                                <i className='fas fa-ellipsis-v'></i>
                              </button>

                              <div className='dropdown-menu my-2' aria-labelledby='dropdownMenuLink'>
                                <button
                                  className='dropdown-item'
                                  data-toggle='modal'
                                  data-target='#donationModal'
                                  onClick={() => handleDonationData(e)}
                                >
                                  Edit Donation
                                </button>
                                <button className='dropdown-item' onClick={() => handleDeleteDonation(e)}>
                                  Delete Donation
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className='text-center'>No Post is available</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='container-fluid mt-2'>
        <div className='row'>
          <div className='col-lg-8 offset-lg-2'>
            <div className='tp-donate-header'>
              <h2>Post For Query</h2>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className='features-area features-area-2'>
                <div className='container-fluid'>
                  <div className='row'>
                    {queryPost.length ? (
                      queryPost.map((e, i) => (
                        <div key={i} className='col-lg-4 col-md-6 col-12'>
                          <div className='features-item-2'>
                            <div className='features-icon'>
                              <img className='' style={{ height: '200px' }} src={!!e.image ? e.image : placeholder} alt='' />
                            </div>
                            <div className='features-content'>
                              <h3>{e.title}</h3>
                              <p>{e.category}</p>
                              <p>{e.description}</p>
                            </div>
                            <div className='dropdown d-flex justify-content-end mt-2 pr-3'>
                              <button
                                className='btn btn-dark'
                                id='dropdownMenuLink'
                                data-toggle='dropdown'
                                aria-expanded='false'
                              >
                                <i className='fas fa-ellipsis-v'></i>
                              </button>

                              <div className='dropdown-menu my-2' aria-labelledby='dropdownMenuLink'>
                                <button
                                  className='dropdown-item'
                                  data-toggle='modal'
                                  data-target='#queryModal'
                                  onClick={() => handleQueryData(e)}
                                >
                                  Edit Query
                                </button>
                                <button className='dropdown-item' onClick={() => handleDeleteQuery(e)}>
                                  Delete Query
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className='text-center'>No Query is available</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <DonationModal data={donationData} id={donationId} />
      <QueryModal data={queryData} id={queryId} />
    </div>
  );
};

export default MyPost;
