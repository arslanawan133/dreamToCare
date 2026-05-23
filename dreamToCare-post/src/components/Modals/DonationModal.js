import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './style.css';
import { CreateDonationPost, UpdateDonationPost } from '../../actions/postAction';
import { useHistory } from 'react-router-dom';
import placeholder from '../../images/placeholder.png';

const DonationModal = ({ data, id }) => {
  const [donationPost, setDonationPost] = useState({ title: '', description: '', category: '', image: '' });
  const history = useHistory();

  const handleDonationPost = (e) => {
    const { name, value } = e.target;
    setDonationPost({ ...donationPost, [name]: value });
  };
  const dispatch = useDispatch();

  const submitDonationPost = () => {
    const { title, description, category } = donationPost;
    const errors = [];
    if (title.length === 0) errors.push('Title');
    if (description.length === 0) errors.push('Description');
    if (category.length === 0) errors.push('Category');
    if (errors.length) {
      toast.error(errors.join(', ') + ' is required');
    } else {
      data ? dispatch(UpdateDonationPost(donationPost, id)) : dispatch(CreateDonationPost(donationPost));
      history.push("/my-post");
    }
  };

  useEffect(() => {
    if (data) {
      setDonationPost(data);
    }
  }, [data]);

  const imageInput = useRef(null);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleImageChange = async (e) => {
    const imageUploaded = e.target.files[0];
    if (!!imageUploaded) {
      const base64 = await getBase64(imageUploaded);
      setDonationPost({ ...donationPost, image: base64 })
    }
  }

  return (
    <div>
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
                Post for Donation
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-6'>
                    <input
                      type='text'
                      className='form-control'
                      name='title'
                      onChange={handleDonationPost}
                      value={donationPost.title}
                      id='fname'
                      placeholder='Title'
                    />
                  </div>
                  <div className='col-md-6'>
                    <select
                      className='form-control'
                      name='category'
                      value={donationPost.category}
                      onChange={handleDonationPost}
                    >
                      <option value='' disabled>
                        Select Category
                      </option>
                      <option>Household Items</option>
                      <option>Electronics</option>
                    </select>
                  </div>
                </div>
                <div className='row my-2'>
                  <div className='col-md-12'>
                    <textarea
                      className='form-control'
                      name='description'
                      id='fname'
                      value={donationPost.description}
                      onChange={handleDonationPost}
                      placeholder='Description'
                    />
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='d-flex form-group justify-content-between'>
                    <label className='d-flex text-white'>Select Image</label>
                    <picture>
                      <img className='image-input' src={!!donationPost.image ? donationPost.image : placeholder} style={{ height: '200px', width: '320px' }} alt="" />
                      {!donationPost.image ? <button className='edit' onClick={() => imageInput.current.click()}><i className='fas fa-picture-o'></i></button>
                        : <button className='close' onClick={() => setDonationPost({ ...donationPost, image: '' })}><i className='fas fa-close'></i></button>}
                    </picture>
                    <input type={"file"} accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} ref={imageInput} />
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='theme-btn-s2' data-dismiss='modal' onClick={() => setDonationPost({ title: '', description: '', category: '', image: '' })}>
                Close
              </button>
              <button type='button' className='theme-btn' data-dismiss='modal' onClick={submitDonationPost}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
