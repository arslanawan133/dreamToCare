import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NgoSignUp } from '../../actions/authAction';
import OneSignalReact from 'react-onesignal';

const NgoSignup = () => {
  
  const [value, setValue] = useState({
    email: '',
    ngoName: '',
    accountHolderName: '',
    password: '',
    address: '',
    cnic: '',
    confirm_password: '',
  });
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: 'errorMessage',
      messages: {
        in: 'Password and confirm password must be equal',
      },
    })
  );

  const submitForm = async (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      const { email, ngoName, accountHolderName, password, address, cnic } = value;
      let auth;
      OneSignalReact.getUserId().then(async (playerId) => {
        auth = await dispatch(
          NgoSignUp({
            email,
            ngoName,
            accountHolderName,
            address,
            cnic,
            password,
            playerId,
          })
        );
        if (auth && auth.message) {
          toast.error(auth.message);
        } else {
          validator.hideMessages();
          toast.success('Registration Complete successfully!');
        }
      });
    } else {
      validator.showMessages();
      toast.error('Empty fields are not allowed!');
    }
  };
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }; 
  return (
    <Grid className='loginWrapper'>
      <Grid className='loginForm'>
      <h2> <Link onClick={ClickHandler} to='/' title=''>Dream to Care</Link></h2>
        <h2>Signup as Ngo</h2>
        <p>Signup your account</p>
        <form onSubmit={submitForm}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className='inputOutline'
                fullWidth
                placeholder='Ngo Name'
                value={value.ngoName}
                variant='outlined'
                name='ngoName'
                label='Ngo Name'
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('Ngo Name', value.ngoName, 'required')}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className='inputOutline'
                fullWidth
                placeholder='Account Holder Name'
                value={value.accountHolderName}
                variant='outlined'
                name='accountHolderName'
                label='Account Holder Name'
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('Account Holder Name', value.accountHolderName, 'required')}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className='inputOutline'
                fullWidth
                placeholder='E-mail'
                value={value.email}
                variant='outlined'
                name='email'
                label='E-mail'
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('email', value.email, 'required|email')}
            </Grid>{' '}
            <Grid item xs={12}>
              <TextField
                className='inputOutline'
                fullWidth
                placeholder='Address'
                value={value.address}
                variant='outlined'
                name='address'
                label='Address'
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('address', value.address, 'required|address')}
            </Grid>{' '}
            <Grid item xs={12}>
              <TextField
                className='inputOutline'
                fullWidth
                placeholder='CNIC of account holder'
                value={value.cnic}
                variant='outlined'
                inputProps={{ maxLength: 13 }}
                name='cnic'
                label='CNIC of account holder'
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('cnic', value.cnic, 'required|cnic')}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className='inputOutline'
                type='password'
                fullWidth
                placeholder='Password'
                value={value.password}
                variant='outlined'
                name='password'
                label='Password'
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('password', value.password, 'required')}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className='inputOutline'
                type='password'
                fullWidth
                placeholder='Confirm Password'
                name='confirm_password'
                value={value.confirm_password}
                variant='outlined'
                label='Confirm Password'
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
              {validator.message('confirm password', value.confirm_password, `in:${value.password}`)}
            </Grid>
            <Grid item xs={12}>
              <Grid className='formFooter'>
                <Button fullWidth className='cBtn cBtnLarge cBtnTheme' type='submit'>
                  Sign Up
                </Button>
              </Grid>
              <p className='noteHelp'>
                Already have an account? <Link to='/ngo-signin'>Return to Sign In</Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default withRouter(NgoSignup);
