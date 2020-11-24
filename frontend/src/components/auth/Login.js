import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

/* 
    T O D O

    1. UI changes
    2. showPasswordToggle
    3. Alert system

 */

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        
        setFormData({ ...formData,
            [name] : value
        });
    };

    const onSubmitHandle = (e) => {
        e.preventDefault();
        login(email, password);
    };

    //Redirect if logged in
    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    };

    return (
        <div>
            <Fragment>
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign Into  Your Account</p>
                <form className="form" onSubmit={e => onSubmitHandle(e)}>
                    <div className="form-group">
                    <input 
                    type="email" 
                    placeholder="Email Address" 
                    name="email"
                    value={email}
                    onChange={e => onChangeHandle(e)}
                    required
                    />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChangeHandle(e)}
                        minLength="6"
                    />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to='/register'>Sign Up</Link>
                </p>
            </Fragment>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
    login
})(Login);
