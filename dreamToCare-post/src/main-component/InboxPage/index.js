import React, { Fragment } from 'react'
import Footer from '../../components/footer';
import Inbox from '../../components/inbox';
import Navbar from '../../components/Navbar';
import PageTitle from '../../components/pagetitle';
import Scrollbar from '../../components/scrollbar';

function InboxPage() {
    return (
        <Fragment>
            <Navbar/>
            <PageTitle pageTitle={'Chat Inbox'} pagesub={'Inbox'}/>
            <Inbox />
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
}

export default InboxPage;
