import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from '../HomePage';
import InboxPage from '../InboxPage';
import AboutPage from '../AboutPage';
import ErrorPage from '../ErrorPage';
import ContactPage from '../ContactPage';
import LoginPage from '../LoginPage';
import SignUpPage from '../SignUpPage';
import ForgotPassword from '../ForgotPassword';
import MyPost from '../MyPostPage';
import DonationPosts from '../DonationPostPage';
import QueryPosts from '../QueriesPostPage';
import OpenPostsPage from '../openPostPage';
import MessagesPage from '../messagesPage';
import DastarkhuanPage from '../livedastarkhuanPage';
import ProfilePage from '../ProfilePage';
import ReportedPostsPage from '../ReportedPostsPage';
import ResetPage from '../ResetPage';

const AllRoute = () => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/inbox' component={InboxPage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/404' component={ErrorPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignUpPage} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/reset-password' component={ResetPage} />
          <Route path='/my-post' component={MyPost} />
          <Route path='/reported-posts' component={ReportedPostsPage} />
          <Route path='/donations' component={DonationPosts} />
          <Route path='/queries' component={QueryPosts} />
          <Route path='/post/:id' component={OpenPostsPage} />
          <Route path='/notifications' component={MessagesPage} />
          <Route path='/liveDastarkhuan' component={DastarkhuanPage} />
          <Route path='/profile' component={ProfilePage} />
        </Switch>
      </Router>
    </div>
  );
};

export default AllRoute;
