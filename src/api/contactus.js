import axios from "../config/axiosConfig";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    post:(email,message)=> axios.post('/contactus/send', {
        "email": email, 
        "message": message
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
      return({data:''})
    })
};  