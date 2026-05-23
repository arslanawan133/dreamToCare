import React from 'react'
import {Link}  from 'react-router-dom'
import Logo from '../../images/logo.png'
import './style.css'

const Footer = (props) =>{

    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }

  return(
    <footer className="tp-ne-footer">
        <div className="tp-site-footer">
            <div className="tp-upper-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-3 col-md-6 col-sm-12 col-12">
                            <div className="widget about-widget">
                                <div className="logo widget-title">
                                    <img src={Logo} alt="" />
                                </div>
                                <p>A platform where donation and recieving help is made easier </p>
                            </div>
                        </div>
                        <div className="col col-lg-2 col-md-6 col-sm-12 col-12">
                            <div className="widget link-widget">
                                <div className="widget-title">
                                    <h3>Useful Links</h3>
                                </div>
                                <ul>
                                    <li><Link onClick={ClickHandler} to="/about">About Us</Link></li>
                                    <li><Link onClick={ClickHandler} to="/notifications">Notifications</Link></li>
                                    <li><Link onClick={ClickHandler} to="/my-post">My Post</Link></li>
                                    <li><Link onClick={ClickHandler} to="/queries">Queries</Link></li>
                                    <li><Link onClick={ClickHandler} to="/donations">Posts</Link></li>
                                    <li><Link onClick={ClickHandler} to="/contact">Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 offset-lg-1 col-md-6 col-sm-12 col-12">
                            <div className="widget market-widget tp-service-link-widget">
                                <div className="widget-title">
                                    <h3>Contact </h3>
                                </div>
                                <p>Online platform for donation and charity</p>
                                <div className="contact-ft">
                                    <ul>
                                        <li><i className="fi flaticon-pin"></i>Lahore,Pakistan</li>
                                        <li><i className="fi flaticon-call"></i>+9200000000</li>
                                        <li><i className="fi flaticon-envelope"></i>dreamtocare@gmail.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <div className="tp-lower-footer">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <p className="copyright">Copyright &copy; - {new Date().getFullYear()} - Dream to Care. All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer;
