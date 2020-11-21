import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts }) => {

    useEffect(() => {
        getPosts()
    }, [getPosts]);

    return (
        <section className="container">
            <h1>test 😀😀</h1>
        </section>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(Posts)
