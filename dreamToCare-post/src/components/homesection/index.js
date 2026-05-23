import React, { useEffect } from "react";
import './style.css'
import Post from "../post";
import 'bootstrap/dist/css/bootstrap.min.css';
import slide1 from '../../images/carousel/slide1.webp';
import slide2 from '../../images/carousel/slide2.webp';
import slide3 from '../../images/carousel/slide3.webp';

const HomeSection = () => {
    useEffect(() => {
        !!window.$ && window.$('.carousel').carousel({
            interval: 2000
        })
    }, []);
    return (
        <section className="hero hero-slider hero-style-1">
            <div className="slide">
                <div className="container-fluid">
                    <div className="col-lg-6  col-xl-5 slide-caption">
                        <div className="slide-title">
                            <h2>Let’s be Kind for <span>Each other</span></h2>
                        </div>
                        <div className="slide-subtitle">
                            <p>Platfrom which make easier for donation and recieving help</p>
                            <p>You Can Satisfy Yourself By Helping.</p>
                        </div>
                        <Post />
                    </div>
                </div>|
                <div className="carousel slide carousel-fade" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={slide1} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={slide2} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={slide3} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default HomeSection;