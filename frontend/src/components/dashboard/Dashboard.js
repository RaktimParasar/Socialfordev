import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import Spinner  from '../layout/Spinner';
import Alert from '../layout/Alert';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, 
    auth: { user },
    profile: { loading, profile} }) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    
    return (
        <section className="container">
            {
                loading && profile === null ? (
                <Spinner />
                ) : (
                <Fragment>
                    <Alert />
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead">
                        <i className="fas fa-user" /> Welcome {user && user.name}
                    </p>
                    {
                        profile !== null ? (
                            <Fragment>
                                <DashboardActions />
                                <Experience experience={profile.experience} />
                                <Education education={profile.education} />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <p>You have not yet setup a profile, please add some info</p>
                                <Link to='/create-profile' className="btn btn-primary my-1">
                                    Create Profile
                                </Link>
                            </Fragment>
                        )
                    }
                </Fragment>
                )
            }
        </section>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, {
    getCurrentProfile,
})(Dashboard)
