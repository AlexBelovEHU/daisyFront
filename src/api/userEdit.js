/* eslint-disable import/no-anonymous-default-export */
import axios from "../config/axiosConfig";


export default {
  post: (email, password, shippingAddress) => axios.post('/user/edit', {
    "email": email,
    "password": password,
    "shipping_address": shippingAddress
  }, {
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
      console.log('Error making the get request', error);
      return({data:''})
    })
};  