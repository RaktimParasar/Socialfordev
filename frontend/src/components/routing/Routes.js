import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/profiles' component={Profiles} />
                <Route exact path='/profile/:id' component={Profile} />
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/profile-form' component={ProfileForm} />
                <PrivateRoute exact path='/add-experience' component={AddExperience} />
                <PrivateRoute exact path='/add-education' component={AddEducation} />
                <PrivateRoute exact path='/add-education' component={AddEducation} />
                <PrivateRoute exact path='/posts' component={Posts} />
                <PrivateRoute exact path='/post/:id' component={Post} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Routes