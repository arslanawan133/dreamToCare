import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import './style.css'

const CtaSection = (props) => {
    const { auth } = useSelector(({auth}) => ({auth}));

    return(
        <div className="tp-cta-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-cta-text">
                            <h2>You Can Help The Poor With Us</h2>
                            <p>Anyone who wants to join in for our cause, click Join Us Now </p>
                            {  !auth.isSignedIn ?
                                <div className="btns">
                                    <Link to="/signup" className="theme-btn-s2">Join Us Now</Link>
                                </div> : (
                                    <p>You are logged in right now!</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CtaSection;
