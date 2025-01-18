/* eslint-disable import/no-anonymous-default-export */
import axios from "../config/axiosConfig";


export default {
  get: () => axios.get('/transactions/list',
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
    .then(response => {
      console.log(response);
      return response
    })
    .catch(error => {
      // eslint-disable-next-line eqeqeq
      if (error.response.status == 403) {
        console.log("Not Logged In Error")
        return({data:["NotLoggedIn"]})
      } else {        
        console.log('Error making the get request', error);
        return({data:''})
      }
    })
};  