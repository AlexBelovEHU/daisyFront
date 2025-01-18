/* eslint-disable eqeqeq */
import axios from "../config/axiosConfig";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    post:(email,password)=> axios.post('/login', {
        "email": email,
        "password": password
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
      if (error.response.data.detail == 'Incorrect username or password') {
        return({data:"ErrorIncorrectPassword"})
      }
      else if (error.response.data.detail == "Empty password is not allowed") {
      return({data:"ErrorIncorrectPassword"})
      }
      console.log('Error making the get request', error);
      return({data:''})
    })
};  