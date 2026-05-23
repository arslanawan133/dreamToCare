import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle'
import About from '../../components/about'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import abimg from '../../images/logo.png'

const CasePage =() => {
    return(
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'About Us'} pagesub={'About'}/>
            <About AbImg={abimg}/>
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};
export default CasePage;
