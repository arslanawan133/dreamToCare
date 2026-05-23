import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { PostMessage } from '../../actions/messagesAction';
import { toast } from 'react-toastify';
import TalkJS from 'talkjs';
import pmt1 from '../../images/checkout/img-1.png'
import pmt2 from '../../images/checkout/img-2.png'
import pmt3 from '../../images/checkout/img-3.png'
import pmt4 from '../../images/checkout/img-4.png'
import placeholder from '../../images/placeholder.png'
import { DeleteDonationPost, DeleteQueryPost, ReportPost } from '../../actions/postAction';

const QueryPosts = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [donation, setDonation] = useState({ amount: '' });
  const [payment, setPayment] = useState({
    method: '',
    cardType: '',
    cardHolderName: '',
    cardNumber: '',
    cvv: '',
    expiryDate: ''
  });
  const [me, setMe] = useState(null);
  const [other, setOther] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [session, setSession] = useState(null);
  const [popup, setPopup] = useState(null);
  const postId = location.pathname.split('/').reverse()[0];
  const { queryPost, donationPost, auth } = useSelector((state) => ({
    auth: state.auth,
    queryPost: state.posts.queryPost.find((e) => e._id === postId),
    donationPost: state.posts.donationPost.find((e) => e._id === postId),
  }));

  const post = queryPost ? queryPost : donationPost;

  const handleDonation = (e) => {
    const { value } = e.target;
    setDonation({ amount: value });
  };
  const isValidDonation = () => {
    const { method, cardType, cardHolderName, cardNumber, cvv, expiryDate } = payment;
    const errors = [];
    if (donation.amount.length === 0) { errors.push('Donation amount') }
    if (method.length === 0) { errors.push('Payment method') }
    else if (method === "byCard") {
      if (cardType.length === 0) errors.push('Card type');
      if (cardHolderName.length === 0) errors.push('Card holder name');
      if (cardNumber.length === 0) errors.push('Card number');
      if (cvv.length === 0) errors.push('CVV');
      if (expiryDate.length === 0) errors.push('Expiry date');
    }
    return errors
  }
  const handleSubmit = () => {
    const errors = isValidDonation();
    if (errors.length) {
      toast.error(errors.join(', ') + ' is required');
    } else {
      dispatch(PostMessage({ ...donation, receiverId: post.creator._id })).then(() => {
        setDonation({ amount: '' })
        setPayment({ method: '', cardType: '', cardHolderName: '', cardNumber: '', cvv: '', expiryDate: '' })
      });
    }
  };
  useEffect(() => {
    if (auth.isSignedIn && !!post) {
      TalkJS.ready
        .then(() => {
          setMe(window.talkSession.me);
          setOther(
            new TalkJS.User({
              id: post.creator._id,
              name: post.creator.name,
              email: post.creator.email,
              role: queryPost ? 'query' : 'post'
            })
          );
        })
    };
  }, [auth, post, queryPost]);

  useEffect(() => {
    me !== null && setSession(
      window.talkSession
    );
  }, [me]);

  useEffect(() => {
    if (me !== null && other !== null && session !== null) {
      const conversationId = TalkJS.oneOnOneId(me, other);
      setConversation(session.getOrCreateConversation(conversationId))
    }
  }, [me, other, session]);

  useEffect(() => {
    return () => {
      popup !== null && popup.destroy()
    }
  }, [popup]);

  const reportPost = (e) => {
    if (auth.isSignedIn && !auth.isAdmin) {
      dispatch(ReportPost(post._id, auth.id, queryPost ? 'query' : 'post'));
      e.target.disabled = true
    } else {

    }
  }

  const deleteItem = (e) => {
    if (queryPost) {
      dispatch(DeleteQueryPost(post._id));
    }
    else {
      dispatch(DeleteDonationPost(post._id));
    }
    window.location.href = `/${queryPost ? 'queries' : 'donations'}`
  };

  const loadChat = () => {
    if (conversation !== null) {
      conversation.setParticipant(me);
      conversation.setParticipant(other);
      const popup = session.createPopup();
      popup.select(conversation);
      popup.mount({ show: true });
      setPopup(popup);
    }
  };

  return (
    <>
      <div className='tp-donation-page-area section-padding'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-8 offset-lg-2'>
              <div className='tp-donate-header'>
                <h2>{!!queryPost ? 'Query' : !!donationPost ? 'Donation' : 'No item available...'}</h2>
              </div>
              {post && (
                <div className='features-area features-area-2'>
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className='features-item-2'>
                          <div className='features-icon'>
                            <img className='' style={{ height: '400px' }} src={post.image ? post.image : placeholder} alt='' />
                          </div>
                          <div className='features-content'>
                            <h3>{post.title}</h3>
                            <p>{post.category}</p>
                            <p>{post.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='tp-cta-text'>
                      <div className='btns mb-4'>
                        {auth.isSignedIn ? (
                          <>
                            {
                              auth.id !== post.creator._id ? (
                                <>
                                  <button className='theme-btn' onClick={loadChat}>
                                    Contact
                                  </button>
                                  <button disabled={post.reportIds.includes(auth.id)} className='theme-btn-s2 theme-btn-danger' onClick={reportPost}
                                    id={'dropdownMenuLink'}
                                    data-toggle={auth.isAdmin && 'dropdown'}
                                    aria-expanded='false'
                                  >
                                    <i className={"fas fa-exclamation-circle" + (post.reportIds.length === 0 ? " mr-2" : "")}></i> {auth.isAdmin ? post.reportIds.length : 'Report'}
                                  </button>
                                  <div className='dropdown-menu my-1' aria-labelledby='dropdownMenuLink'>
                                    <button className='dropdown-item'
                                      onClick={deleteItem}
                                    >
                                      Delete {queryPost ? 'Query' : 'Donation'}
                                    </button>
                                  </div>
                                </>
                              ) : null
                            }
                            {!auth.isAdmin && post.category === 'Financial' && (
                              <button className='theme-btn-s2' data-toggle='modal' data-target='#donationModal'>
                                Help
                              </button>
                            )}
                          </>
                        ) : (
                          <p>You need to Login or Signup to Contact {post.category === 'Financial' && 'or Help'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='donationModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content' style={{ background: '#252525' }}>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Financial Help
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className="tp-donations-amount">
                <h2>Your Donation</h2>
                <input type="text" className="form-control" name="text" id="text" placeholder="Enter Donation Amount" onChange={handleDonation}
                  value={donation.amount} />
              </div>
              <div className="tp-donations-details">
                <h2>Choose Your Payment Method</h2>
                <div className="tp-payment-area">
                  <div className="row">
                    <div className="col-12">
                      <div className="tp-payment-option" id="open4">
                        <div className="tp-payment-select">
                          <ul className='d-flex justify-content-between p-0'>
                            <li className="addToggle">
                              <input className='mr-2' id="add" type="radio" value="byCard" onChange={(e) => setPayment({ ...payment, method: e.target.value })} checked={payment.method === "byCard"} />
                              <label htmlFor="add">Payment By Card</label>
                            </li>
                            <li className="removeToggle">
                              <input className='mr-2' id="remove" type="radio" value="byOffline" onChange={(e) => setPayment({ ...payment, method: e.target.value })} checked={payment.method === "byOffline"} />
                              <label htmlFor="remove">Offline Donation</label>
                            </li>
                          </ul>
                        </div>
                        {payment.method === "byCard" && <div id="open5" className="payment-name">
                          <ul className='p-0'>
                            <li className="visa"><input id="1" type="radio" name="size" value="visa" onChange={(e) => setPayment({ ...payment, cardType: e.target.value })} checked={payment.cardType === "visa"} />
                              <label htmlFor="1"><img src={pmt1} alt="" /></label>
                            </li>
                            <li className="mas"><input id="2" type="radio" name="size" value="mastercard" onChange={(e) => setPayment({ ...payment, cardType: e.target.value })} checked={payment.cardType === "mastercard"} />
                              <label htmlFor="2"><img src={pmt2} alt="" /></label>
                            </li>
                            <li className="ski"><input id="3" type="radio" name="size" value="skrill" onChange={(e) => setPayment({ ...payment, cardType: e.target.value })} checked={payment.cardType === "skrill"} />
                              <label htmlFor="3"><img src={pmt3} alt="" /></label>
                            </li>
                            <li className="pay"><input id="4" type="radio" name="size" value="paypal" onChange={(e) => setPayment({ ...payment, cardType: e.target.value })} checked={payment.cardType === "paypal"} />
                              <label htmlFor="4"><img src={pmt4} alt="" className='px-1' /></label>
                            </li>
                          </ul>
                          <div className="mt-3">
                            <div className="row">
                              <div className="col-12 form-group">
                                <input type="text" className="form-control" name="cardHolderName" id="cardHolderName" placeholder="Card Holder Name" value={payment.cardHolderName} onChange={(e) => setPayment({ ...payment, cardHolderName: e.target.value })} />
                              </div>
                              <div className="col-12 form-group">
                                <input type="text" className="form-control" name="cardNumber" id="cardNumber" placeholder="Card Number" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} />
                              </div>
                              <div className="col-4 form-group">
                                <input type="email" className="form-control" name="cvv" id="cvv" placeholder="CVV" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} />
                              </div>
                              <div className="col-8 form-group">
                                <input type="text" className="form-control" name="expiryDate" id="expiryDate" placeholder="Expiry Date" value={payment.expiryDate} onChange={(e) => setPayment({ ...payment, expiryDate: e.target.value })} />
                              </div>
                            </div>
                          </div>
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='theme-btn-s2' data-dismiss='modal' onClick={() => { setDonation({ amount: '' }); setPayment({ method: '', cardType: '', cardHolderName: '', cardNumber: '', cvv: '', expiryDate: '' }); }}>
                Close
              </button>
              <button type='button' className='theme-btn' data-dismiss={isValidDonation().length === 0 && 'modal'} onClick={handleSubmit}>
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QueryPosts;
