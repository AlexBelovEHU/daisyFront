import axios from "../config/axiosConfig";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  post: (amount, token, currency) => axios.post(`/deposit/new/expay`, {
    "amount": amount,
    "token": token,
    "currency": currency
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
      console.error('Error making the POST request', error);
      return ({ data:'Error'})
    })
};  