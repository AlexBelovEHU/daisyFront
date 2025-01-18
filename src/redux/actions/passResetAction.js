/* eslint-disable eqeqeq */
import exampledep from "../../api/passReset"



export const getExample = (data) => {
  console.log(data)
  localStorage.setItem('sessionToken', data.data.token)
  console.log(localStorage.getItem('sessionToken')==data.data.token)
  return {
    type: "PASS_RESET",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const passResetPost = (username) => (dispatch) => {
  dispatch(loadingExample());
  exampledep.post(username).then((data) => (dispatch(getExample(data))))
};
