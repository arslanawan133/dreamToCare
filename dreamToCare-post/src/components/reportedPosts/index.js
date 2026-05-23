import React from 'react';
import Loader from '../loader';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteReportDonation, DeleteReportQuery } from '../../actions/postAction';
import { Link } from 'react-router-dom';
import placeholder from '../../images/placeholder.png';

const ReportedPosts = () => {
    const dispatch = useDispatch();
    const { reportedPosts, isLoading } = useSelector((state) => ({
        isLoading: state.posts.loading,
        reportedPosts: state.posts.reportedPosts
    }));

    const handleDeleteDonation = (e) => {
        dispatch(DeleteReportDonation(e._id));
    };

    const handleDeleteQuery = (e) => {
        dispatch(DeleteReportQuery(e._id));
    };

    return (
        <div className='tp-donation-page-area section-padding'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-8 offset-lg-2'>
                        <div className='tp-donate-header'>
                            <h2>Reported Donation Posts</h2>
                        </div>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <div className='features-area features-area-2'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        {reportedPosts.reportedDonations.length ? (
                                            reportedPosts.reportedDonations.sort((a, b) => b.reportIds.length - a.reportIds.length).map((e, i) => (
                                                <div key={i} className='col-lg-4 col-md-6 col-12'>
                                                    <div className='features-item-2'>
                                                        <div className='features-icon'>
                                                            <img className='' style={{ height: '200px' }} src={e.image} alt='' />
                                                        </div>
                                                        <div className='features-content'>
                                                            <h3>{e.title}</h3>
                                                            <p>{e.category}</p>
                                                            <p style={{ fontSize: '13px' }}>{e.description}</p>
                                                        </div>
                                                        <div className='dropdown d-flex justify-content-between mt-2 px-3'>
                                                            <button disabled className='btn btn-sm btn-outline-danger'>
                                                                <i className='fas fa-exclamation-circle'></i>
                                                                <span className='ml-2 font-weight-bold'>{e.reportIds.length}</span>
                                                            </button>
                                                            <button
                                                                className='btn btn-dark'
                                                                id='dropdownMenuLink'
                                                                data-toggle='dropdown'
                                                                aria-expanded='false'
                                                            >
                                                                <i className='fas fa-ellipsis-v'></i>
                                                            </button>

                                                            <div className='dropdown-menu my-2' aria-labelledby='dropdownMenuLink'>
                                                                <Link className='dropdown-item' to={`/post/${e._id}`}>
                                                                    View Donation
                                                                </Link>
                                                                <button className='dropdown-item' onClick={() => handleDeleteDonation(e)}>
                                                                    Delete Donation
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className='text-center'>No Reported Donations are available</p>
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
                            <h2>Reported Query Posts</h2>
                        </div>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <div className='features-area features-area-2'>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        {reportedPosts.reportedQueries.sort((a, b) => b.reportIds.length - a.reportIds.length).length ? (
                                            reportedPosts.reportedQueries.map((e, i) => (
                                                <div key={i} className='col-lg-4 col-md-6 col-12'>
                                                    <div className='features-item-2'>
                                                        <div className='features-icon'>
                                                            <img className='' style={{ height: '200px' }} src={!!e.image ? e.image : placeholder} alt='' />
                                                        </div>
                                                        <div className='features-content'>
                                                            <h3>{e.title}</h3>
                                                            <p>{e.category}</p>
                                                            <p style={{ fontSize: '13px' }}>{e.description}</p>
                                                        </div>
                                                        <div className='dropdown d-flex justify-content-between mt-2 px-3'>
                                                            <button disabled className='btn btn-sm btn-outline-danger'>
                                                                <i className='fas fa-exclamation-circle'></i>
                                                                <span className='ml-2 font-weight-bold'>{e.reportIds.length}</span>
                                                            </button>
                                                            <button
                                                                className='btn btn-dark'
                                                                id='dropdownMenuLink'
                                                                data-toggle='dropdown'
                                                                aria-expanded='false'
                                                            >
                                                                <i className='fas fa-ellipsis-v'></i>
                                                            </button>

                                                            <div className='dropdown-menu my-2' aria-labelledby='dropdownMenuLink'>
                                                                <Link className='dropdown-item' to={`/post/${e._id}`}>
                                                                    View Query
                                                                </Link>
                                                                <button className='dropdown-item' onClick={() => handleDeleteQuery(e)}>
                                                                    Delete Query
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className='text-center'>No Reported Queries are available</p>
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

export default ReportedPosts;
