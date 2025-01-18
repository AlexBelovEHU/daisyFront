import exampledep from "../../api/logout"


export const getExample = (data) => {
  console.log(data)
  localStorage.setItem('sessionToken', '')
  window.location.href='/'
  return {
    type: "GET_EXAMPLE",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const logoutGet = () => (dispatch) => {
  dispatch(loadingExample());
  exampledep.get().then((data) => (dispatch(getExample(data))))
};
