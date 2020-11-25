import axios from 'axios';

//setting auth token globally for authentication
export const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
};

export default setAuthToken;