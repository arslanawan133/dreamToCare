import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CreateQueryPost, UpdateQueryPost } from '../../actions/postAction';
import { useHistory } from 'react-router-dom';
import placeholder from '../../images/placeholder.png';

const QueryModal = ({ data, id }) => {
  const [queryPost, setQueryPost] = useState({ title: '', description: '', category: '', image: '' });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleQueryPost = (e) => {
    const { name, value } = e.target;
    setQueryPost({ ...queryPost, [name]: value });
  };

  useEffect(() => {
    if (data) {
      setQueryPost(data);
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
      setQueryPost({ ...queryPost, image: base64 })
    }
  }

  const submitQueryPost = () => {
    const { title, description, category } = queryPost;
    const errors = [];
    if (title.length === 0) errors.push('Title');
    if (description.length === 0) errors.push('Description');
    if (category.length === 0) errors.push('Category');
    if (errors.length) {
      toast.error(errors.join(', ') + ' is required');
    } else {
      data ? dispatch(UpdateQueryPost(queryPost, id)) : dispatch(CreateQueryPost(queryPost));
      history.push("/my-post");
    }
  };
  return (
    <div>
      <div
        className='modal fade'
        id='queryModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content' style={{ background: '#252525' }}>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Post for Query
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
                      onChange={handleQueryPost}
                      value={queryPost.title}
                      id='fname'
                      placeholder='Title'
                    />
                  </div>
                  <div className='col-md-6'>
                    <select
                      className='form-control'
                      name='category'
                      value={queryPost.category}
                      onChange={handleQueryPost}
                    >
                      <option value='' disabled>
                        Select Category
                      </option>
                      <option>Household Items</option>
                      <option>Electronics</option>
                      <option>Financial</option>
                    </select>
                  </div>
                </div>
                <div className='row my-2'>
                  <div className='col-md-12'>
                    <textarea
                      className='form-control'
                      name='description'
                      value={queryPost.description}
                      id='fname'
                      onChange={handleQueryPost}
                      placeholder='Description'
                    />
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='d-flex form-group justify-content-between'>
                    <label className='d-flex text-white'>Select Image</label>
                    <picture>
                      <img className='image-input' src={!!queryPost.image ? queryPost.image : placeholder} style={{ height: '200px', width: '320px' }} alt="" />
                      {!queryPost.image ? <button className='edit' onClick={() => imageInput.current.click()}><i className='fas fa-picture-o'></i></button>
                        : <button className='close' onClick={() => setQueryPost({ ...queryPost, image: '' })}><i className='fas fa-close'></i></button>}
                    </picture>
                    <input type={"file"} accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} ref={imageInput} />
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='theme-btn-s2' data-dismiss='modal' onClick={() => setQueryPost({ title: '', description: '', category: '', image: '' })}>
                Close
              </button>
              <button type='button' className='theme-btn' data-dismiss='modal' onClick={submitQueryPost}>
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryModal;
