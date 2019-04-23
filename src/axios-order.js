import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-5f08f.firebaseio.com/"
});

export default instance;