/* eslint-disable eqeqeq */
import exampledep from "../../api/signin"



export const getExample = (data) => {
  console.log(data)
  localStorage.setItem('sessionToken', data.data.token)
  console.log(localStorage.getItem('sessionToken')==data.data.token)
  return {
    type: "SIGN",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const signPost = (username, password) => (dispatch) => {
  dispatch(loadingExample());
  exampledep.post(username,password).then((data) => (dispatch(getExample(data))))
};
