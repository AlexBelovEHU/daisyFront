import axios from "../config/axiosConfig";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: () => axios.get('/seed/new',
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then(response => {
      console.log(response);
      return response
    })
    .catch(error => {
      if (error.response.status === 403||error.response.status === 401) {
        console.log("Not Logged In Error")
        return({data:["NotLoggedIn"]})
      } else {        
        console.log('Error making the get request', error);
        return({data:''})
      }
    })
};  