import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

/* 
    T O D O

    1. UI changes
    2. showPasswordToggle

 */

const Login = () => {

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
            console.log("Success")
    };
    return (
        <div>
            <Fragment>
            <section className="container">
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
            </section>
            </Fragment>
        </div>
    )
}

export default Login
