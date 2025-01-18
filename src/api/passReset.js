import axios from "../config/axiosConfig";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  post: (email) => axios.post('/pass_reset', {
    "email": email
  }, {
    headers: {
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
      return ({ data: '' })
    })
};  