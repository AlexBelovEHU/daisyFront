import axios from "../config/axiosConfig";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  post: (item_id, type, message) => axios.post('/withdrawal/request', {
    "prize_id": item_id,
    'type':type,
    'message':message
  }, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
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