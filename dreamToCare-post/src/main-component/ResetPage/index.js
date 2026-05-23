import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useLocation, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import Loader from '../../components/loader';
import { IsResetTokenValid, ResetPassword } from '../../actions/authAction';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPage = (props) => {

    const dispatch = useDispatch();
    const [valid, setValid] = useState(false);
    const [value, setValue] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    let query = useQuery();

    useEffect(() => {
        const checkRequest = async () => {
            const token = query.get("token");
            const data = await dispatch(IsResetTokenValid({ token }));
            if (!data.isValid) {
                toast.error('Link is expired.');
                props.history.push('/');
            } else {
                setValid(true);
            }
        }
        checkRequest();
    }, [query, props.history, dispatch]);

    const { posts } = useSelector(state => state);

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const [validator] = React.useState(
        new SimpleReactValidator({
            className: 'errorMessage',
            messages: {
                in: "New password and confirm password must be equal"
            }
        })
    );

    const submitForm = async (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            const token = query.get("token");
            let auth = await dispatch(ResetPassword({ ...value, token }));
            if (auth && auth.message) {
                toast.error(auth.message);
            } else {
                validator.hideMessages();
                toast.success('Your password is reset succesfully.');
            }
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
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
            {posts.loading || !valid ? (<Loader className={'d-flex justify-content-center align-items-center h-100'} />) : (
                <Grid className='loginForm'>
                    <h2> <Link onClick={ClickHandler} to='/' title=''>Dream to Care</Link></h2 >
                    <h2>Reset Password</h2>
                    <p>Reset your password</p>
                    <form onSubmit={submitForm}>
                        <Grid container spacing={3}>
                            {/* <Grid item xs={12}>
                                <TextField
                                    className='inputOutline'
                                    fullWidth
                                    placeholder='Current Password'
                                    value={value.password}
                                    variant='outlined'
                                    name='current_password'
                                    type='password'
                                    label='Current Password'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => changeHandler(e)}
                                    onChange={(e) => changeHandler(e)}
                                />
                                {validator.message('current password', value.current_password, 'required')}
                            </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    className='inputOutline'
                                    type='password'
                                    fullWidth
                                    placeholder='New Password'
                                    value={value.password}
                                    variant='outlined'
                                    name='newPassword'
                                    label='New Password'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => changeHandler(e)}
                                    onChange={(e) => changeHandler(e)}
                                />
                                {validator.message('new password', value.newPassword, 'required')}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className='inputOutline'
                                    type='password'
                                    fullWidth
                                    placeholder='Confirm Password'
                                    name='confirmPassword'
                                    value={value.confirmPassword}
                                    variant='outlined'
                                    label='Confirm Password'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => changeHandler(e)}
                                    onChange={(e) => changeHandler(e)}
                                />
                                {validator.message('confirm password', value.confirmPassword, `in:${value.newPassword}`)}
                            </Grid>
                            <Grid item xs={12}>
                                <Grid className='formFooter'>
                                    <Button fullWidth className='cBtnTheme' type='submit'>
                                        Reset Password
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid >

            )}
        </Grid >
    );
};

export default withRouter(ResetPage);
