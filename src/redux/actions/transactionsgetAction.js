import transactionsget from "../../api/transactionsget";

export const getExample = (data) => {
  console.log(data)
  return {
    type: "GET_EXAMPLE",
    payload: data,
    payloadType:'transactionsGet',
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const transactionsGet = () => (dispatch) => {
  dispatch(loadingExample());
  transactionsget.get().then((data) => (dispatch(getExample(data))))
};
