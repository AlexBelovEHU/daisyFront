/* eslint-disable import/no-anonymous-default-export */
import axios from "../config/axiosConfig";

export default {
  post: (amount) => 
    axios.post('/deposit/new', {
      "amount": amount,
      "currency": "USD"
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
        'accept': 'application/json',
        'Content-Type': 'application/json' // Add this header to specify the content type
      }
    }
    )
    .then(response => {
      console.log(response);
      return response
    })
    .catch(error => {
      console.log('Error making the get request', error);
      return({data:''})
    })
  
};  