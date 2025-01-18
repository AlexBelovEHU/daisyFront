/* eslint-disable eqeqeq */
import googleAuth from "../../api/googleAuth";



export const getExample = (data) => {
  console.log(data)
  localStorage.setItem('sessionToken', data.data.token)
  console.log(localStorage.getItem('sessionToken')==data.data.token)
  return {
    type: "LOGIN_GOOGLE",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const loginGoogle = () => (dispatch) => {
  dispatch(loadingExample());
  googleAuth.get().then((data) => (dispatch(getExample(data))))
};
