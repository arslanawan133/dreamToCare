import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../loader';
import { Link } from 'react-router-dom';
import './style.css';
import placeholder from '../../images/placeholder.png';

const QueryPosts = () => {
  const { queryPost, isLoading, auth } = useSelector((state) => ({
    auth: state.auth,
    isLoading: state.posts.loading,
    queryPost: state.posts.queryPost,
  }));
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  const queries = queryPost.filter((e) => e.creator._id !== auth.id);

  return (
    <div className='tp-donation-page-area section-padding'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='d-flex pb-4'>
            <input
              className='form-control mx-auto'
              type='text'
              placeholder='Search here...'
              style={{ background: '#202120', color: 'white', width: '400px' }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className='col-lg-8 offset-lg-2'>
            <div className='tp-donate-header'>
              <h2>Query Posts</h2>
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
              <option>Financial</option>
            </select>
            {isLoading ? (
              <Loader />
            ) : (
              <div className='features-area features-area-2'>
                <div className='container-fluid'>
                  <div className='row'>
                    {queries.length ? (
                      queries
                        .filter((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .filter((e) => e.category.includes(category))
                        .map((e, i) => (
                          <div key={i} className='col-lg-4 col-md-6 col-12'>
                            <Link to={`/post/${e._id}`}>
                              <div className='features-item-2'>
                                <div className='features-icon'>
                                  <img className='' style={{ height: '200px' }} src={!!e.image ? e.image : placeholder} alt='' />
                                </div>
                                <div className='features-content'>
                                  <h3>{e.title}</h3>
                                  <p>{e.category}</p>
                                  <p>{e.description}</p>
                                </div>
                              </div>
                            </Link>
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
    </div>
  );
};

export default QueryPosts;
