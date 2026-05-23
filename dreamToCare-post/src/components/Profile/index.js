import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import './style.scss';
import { ChangePassword, UpdateNgo, UpdateUser } from '../../actions/authAction';

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: '',
    ngoName: '',
    accountHolderName: '',
    email: '',
    address: '',
    cnic: '',
  });

  const [pwdValue, setPwdValue] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const changeHandler = (e) => {
    setPwdValue({ ...pwdValue, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: 'errorMessage',
      messages: {
        in: "New password and confirm password must be same"
      }
    })
  );

  const submitForm = async (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      let auth = await dispatch(ChangePassword(pwdValue));
      if (auth && auth.message) {
        toast.error(auth.message);
      } else {
        toast.success('Your password is changed succesfully.');
      }
      validator.hideMessages();
      setPwdValue({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      validator.showMessages();
      toast.error('Empty field is not allowed!');
    }
  };

  useEffect(() => {
    if (auth) {
      setValue({
        name: auth.name,
        ngoName: auth.ngoName,
        accountHolderName: auth.accountHolderName,
        email: auth.email,
        address: auth.address,
        cnic: auth.cnic,
      });
    }
  }, [auth]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setValue((preValue) => ({ ...preValue, [name]: value }));
  };

  const submitProfileUpdate = async () => {
    const { name, ngoName, accountHolderName, email, address, cnic } = value;
    const update = auth.isNgo
      ? await dispatch(UpdateNgo({ ngoName, accountHolderName, email, address, cnic }))
      : await dispatch(UpdateUser({ name, email, address, cnic }));
    if (update && update.message) {
      toast.error(update.message);
    }
  };
  return (
    <div className='container my-4'>
      <h3 className='text-center'>Profile</h3>
      <div className='row my-3'>
        <div className='col-lg-6 col-md-6 col-sm-6 col-12 form-group'>
          {auth.isNgo ? (
            <>
              <label className='text-white'>Ngo Name</label>
              <input
                type='text'
                className='form-control'
                name='ngoName'
                id='fname'
                placeholder='Ngo Name'
                value={value.ngoName}
                onChange={handleUpdate}
              />
            </>
          ) : (
            <>
              <label className='text-white'>Name</label>
              <input
                type='text'
                className='form-control'
                name='name'
                id='fname'
                placeholder='Name'
                value={value.name}
                onChange={handleUpdate}
              />
            </>
          )}
        </div>{auth.isNgo && (
          <div className='col-lg-6 col-md-6 col-sm-6 col-12 form-group'>
            <label className='text-white'>Account Holder Name</label>
            <input
              type='text'
              className='form-control'
              name='accountHolderName'
              id='fname'
              placeholder='Ngo Name'
              value={value.accountHolderName}
              onChange={handleUpdate}
            />
          </div>
        )}
        <div className='col-lg-6 col-md-6 col-sm-6 col-12 form-group clearfix'>
          <label className='text-white'>Email</label>
          <input
            type='email'
            className='form-control'
            name='email'
            id='email'
            placeholder='Email'
            defaultValue={auth.email}
            onChange={handleUpdate}
            disabled
          />
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-12 form-group'>
          <label className='text-white'>Address</label>
          <input
            type='text'
            className='form-control'
            name='address'
            id='Address'
            placeholder='Address'
            onChange={handleUpdate}
            value={value.address}
          />
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6 col-12 form-group'>
          <label className='text-white'>CNIC</label>
          <input
            type='text'
            className='form-control'
            name='cnic'
            id='cnic'
            maxLength="13"
            placeholder='CNIC'
            onChange={handleUpdate}
            value={value.cnic}
          />
        </div>
        <div className='d-flex justify-content-between align-items-center my-3'>
          <button className='theme-btn' onClick={submitProfileUpdate} style={{ marginLeft: '45%' }}>
            Update
          </button>
          <button className='btn-link text-decoration-none bg-transparent border-0' data-toggle='modal' data-target='#resetModal' onClick={(e) => e.preventDefault()}>Want to change password?</button>
        </div>
      </div>
      <div
        className='modal fade'
        id='resetModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content' style={{ background: '#252525' }}>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Change Password
              </h5>
              <button typel='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <label className='text-white'>Current Password</label>
              <input
                className='form-control'
                placeholder='Current Password'
                value={pwdValue.currentPassword}
                name='currentPassword'
                type='password'
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('current password', pwdValue.currentPassword, 'required')}

              <label className='text-white mt-2'>New Password</label>
              <input
                className='form-control'
                placeholder='New Password'
                value={pwdValue.newPassword}
                name='newPassword'
                label='New Password'
                type='password'
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('new password', pwdValue.newPassword, 'required')}

              <label className='text-white mt-2'>Confirm Password</label>
              <input
                className='form-control'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={pwdValue.confirmPassword}
                label='Confirm Password'
                type='password'
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('confirm password', pwdValue.confirmPassword, `in:${pwdValue.newPassword}`)}
            </div>
            <div className='modal-footer'>
              <button type='button' className='theme-btn-s2' data-dismiss='modal' onClick={() => { setPwdValue({ currentPassword: '', newPassword: '', confirmPassword: '' }); validator.hideMessages(); }}>
                Close
              </button>
              <button type='button' className='theme-btn' data-dismiss='modal' onClick={submitForm}>
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
