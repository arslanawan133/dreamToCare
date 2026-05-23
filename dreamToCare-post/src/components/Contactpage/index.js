import React from 'react';
import ContactForm from '../ContactFrom'
import './style.css'

const Contactpage = () => {

    return(
        <section className="contact-pg-contact-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6 col-12">
                        <div className="section-title-s3 section-title-s5">
                            <h2>Our Contacts</h2>
                        </div>
                        <div className="contact-details">
                            <p> </p>
                            <ul>
                                <li>
                                    <div className="icon">
                                        <i className="ti-location-pin"></i>
                                    </div>
                                    <h5>Our Location</h5>
                                    <p>Lahore, Pakistan</p>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="ti-mobile"></i>
                                    </div>
                                    <h5>Phone</h5>
                                    <p>+920000000000</p>
                                </li>
                                <li>
                                    <div className="icon">
                                        <i className="ti-email"></i>
                                    </div>
                                    <h5>Email</h5>
                                    <p>dreamtocare@gmail.com</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-12">
                        <div className="contact-form-area">
                            <div className="section-title-s3 section-title-s5">
                                <h2>Quick Contact Form</h2>
                            </div>
                            <div className="contact-form">
                                <ContactForm/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-xs-12">
                       
                    </div>
                </div>
            </div>
        </section>
     )
        
}

export default Contactpage;
