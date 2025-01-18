/* eslint-disable import/no-anonymous-default-export */
import axios from "../config/axiosConfig";


export default {
  get: (page,ln) => axios.get('/box/list', {params:{page,ln}},
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
      if (error.response.status === 403) {
        return ([{ sori: ":("}])
      } else {        
        console.log('Error making the get request', error);
        return({data:''})
      }
    })
};  