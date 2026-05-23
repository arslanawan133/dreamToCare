import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import { SignIn } from '../../actions/authAction';
import OneSignal from 'react-onesignal';
import Loader from '../../components/loader';
import { stopLoadingAction } from '../../actions/postAction';

const LoginPage = (props) => {

  const dispatch = useDispatch();
  const [value, setValue] = useState({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    dispatch(stopLoadingAction());
  }, [dispatch]);
  const { posts } = useSelector(state => state);

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const rememberHandler = () => {
    setValue({ ...value, remember: !value.remember });
  };

  const [validator] = React.useState(
    new SimpleReactValidator({
      className: 'errorMessage',
    })
  );

  const submitForm = async (e) => {
    e.preventDefault();
    const { email, password } = value;
    if (validator.allValid()) {
      let auth;
      OneSignal.getUserId().then(async (playerId) => {
        console.log(playerId)
        auth = await dispatch(SignIn({ email, password, playerId }));
        if (auth && auth.message) {
          toast.error(auth.message);
        } else {
          validator.hideMessages();
          toast.success('You successfully Login on Dream to care !');
        }
        setTimeout(() => {
          validator.hideMessages();
          setValue({
            email: '',
            password: '',
            remember: false,
          })
          if (auth && auth.message) {
            dispatch(stopLoadingAction());
          } else {
            window.location.href = '/';
          }
        }, 1500);
      });
    } else {
      validator.showMessages();
      toast.error('Empty field is not allowed!');
    }
  };
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <Grid className='loginWrapper'>

      {posts.loading ? (<Loader className={'d-flex justify-content-center align-items-center h-100'} />) : (
        <Grid className='loginForm'>
          <h2> <Link onClick={ClickHandler} to='/' title=''>Dream to Care</Link></h2 >
          <h2>Sign In</h2>
          <p>Sign in to your account</p>
          <form onSubmit={submitForm}>
            <Grid container spacing={3}>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='inputOutline'
                  fullWidth
                  placeholder='Password'
                  value={value.password}
                  variant='outlined'
                  name='password'
                  type='password'
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
                <Grid className='formAction'>
                  <FormControlLabel
                    control={<Checkbox checked={value.remember} onChange={rememberHandler} />}
                    label='Remember Me'
                  />
                  <Link to='/forgot-password'>Forgot Password?</Link>
                </Grid>
                <Grid className='formFooter'>
                  <Button fullWidth className='cBtnTheme' type='submit'>
                    Login
                  </Button>
                </Grid>

                <p className='noteHelp'>
                  Don't have an account? <Link to='/signup'>Create free account</Link>
                </p>
              </Grid>
            </Grid>
          </form>
        </Grid >

      )}
    </Grid >
  );
};

export default withRouter(LoginPage);
