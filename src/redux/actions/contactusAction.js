/* eslint-disable eqeqeq */
import contactus from "../../api/contactus";



export const getExample = (data) => {
  console.log(data)
  localStorage.setItem('sessionToken', data.data.token)
  console.log(localStorage.getItem('sessionToken')==data.data.token)
  return {
    type: "CONTACT_US",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const contactusPost = (username, message) => (dispatch) => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  dispatch(loadingExample());
  contactus.post(username,message).then((data) => (dispatch(getExample(data))))
};
