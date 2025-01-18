import exampledep from "../../api/deposit"


export const getExample = (data) => {
  console.log(data)
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


export const depositlink = (amount) => (dispatch) => {
  dispatch(loadingExample());
  exampledep.post(amount).then((data) => (dispatch(getExample(data))))
};
