import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const { company, title, location, from, to, current, description } = formData;

    const onChangeHandle = e => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    };

    const onSubmitHandle = e =>{
        e.preventDefault();
        addExperience(formData, history)
    };

    return (
        <Fragment>
        <section className="container">
        <Alert />
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
            <i className="fas fa-code-branch" /> Add any developer/programming
            positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form
            className="form"
            onSubmit={e => onSubmitHandle(e)}
        >
            <div className="form-group">
            <input
                type="text"
                placeholder="* Job Title"
                name="title"
                value={title}
                onChange={onChangeHandle}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="text"
                placeholder="* Company"
                name="company"
                value={company}
                onChange={onChangeHandle}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChangeHandle}
            />
            </div>
            <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value={from} onChange={onChangeHandle} />
            </div>
            <div className="form-group">
            <p>
                <input
                type="checkbox"
                name="current"
                checked={current}
                value={current}
                onChange={() => {
                    setFormData({ ...formData, current: !current });
                }}
                />{' '}
                Current Job
            </p>
            </div>
            <div className="form-group">
            <h4>To Date</h4>
            <input
                type="date"
                name="to"
                value={to}
                onChange={onChangeHandle}
                disabled={current}
            />
            </div>
            <div className="form-group">
            <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Job Description"
                value={description}
                onChange={onChangeHandle}
            />
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
            </Link>
        </form>
    </section>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(AddExperience)