//*Check to see if token is passed then set to global header if not then delete from global header
import axios from 'axios';

const setAuthToken = token => {
  if(token){
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
  }  else{
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token')
  }
};
export default setAuthToken;