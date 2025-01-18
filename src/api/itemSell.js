import axios from "../config/axiosConfig";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: (item_id) => axios.get(`/item/sell/${item_id}`,  {
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