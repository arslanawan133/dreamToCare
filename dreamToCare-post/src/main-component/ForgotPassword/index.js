import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ForgotPassword as GeneratePasswordLink } from '../../actions/authAction';
import Loader from '../../components/loader';

const ForgotPassword = (props) => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state);
    const [value, setValue] = useState({
        email: '',
    });

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const submitForm = async (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            setValue({
                email: '',
            });
            let auth = await dispatch(GeneratePasswordLink(value));
            if (auth && auth.message) {
                toast.error(auth.message);
            } else {
                validator.hideMessages();
                toast.success('Please check your email for password recovery.');
            }
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } else {
            validator.showMessages();
            toast.error('Empty field is not allowed!');
        }
    };
    return (
        <Grid className="loginWrapper">
            {posts.loading ? (<Loader className={'d-flex justify-content-center align-items-center h-100'} />) : (
                <Grid className="loginForm">
                    <h2>Forgot Password</h2>
                    <p>Reset your account password</p>
                    <form onSubmit={submitForm}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    className="inputOutline"
                                    fullWidth
                                    placeholder="E-mail"
                                    value={value.email}
                                    variant="outlined"
                                    name="email"
                                    label="E-mail"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onBlur={(e) => changeHandler(e)}
                                    onChange={(e) => changeHandler(e)}
                                />
                                {validator.message('email', value.email, 'required|email')}
                            </Grid>
                            <Grid item xs={12}>
                                <Grid className="formFooter">
                                    <Button fullWidth className="cBtn cBtnLarge cBtnTheme" type="submit">Recover
                                        Password</Button>
                                </Grid>

                                <p className="noteHelp">Remember your account? <Link to="/login">Return to Sign In</Link>
                                </p>
                            </Grid>
                        </Grid>
                    </form>

                </Grid>)}
        </Grid>
    )
};

export default withRouter(ForgotPassword);