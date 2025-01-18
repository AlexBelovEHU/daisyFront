import axios from "../config/axiosConfig";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  post: (email, password) => axios.post('/sign', {
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
      if (error.response.status === 422) {
        console.log("UserAlreadyExists")
        return ({ data: "userexists422" })
      }
      // eslint-disable-next-line eqeqeq
      else if (error.response.data.detail == "Empty password is not allowed") {
        return ({ data: "ErrorIncorrectPassword" })
      }
      console.log('Error making the get request', error);
      return({data:''})
    })
};  