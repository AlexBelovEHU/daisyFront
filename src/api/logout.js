import axios from "../config/axiosConfig";
const token = localStorage.getItem('sessionToken')

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get:()=> axios.get('/logout', {
        headers: {
        'Authorization': `Bearer ${token}`,
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
      if (error.response.status === 403) {
        console.log("Not Logged In Error")
        return({data:"NotLoggedIn"})
      }
      console.log('Error making the get request', error);
      return({data:''})
    })
};  