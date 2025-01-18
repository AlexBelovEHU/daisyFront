import balanceGet from "../../api/balanceGet";

export const getExample = (data) => {
  console.log(data)
  
  return {
    type: "BALANCE_GET",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: false,
});


export const balanceget = () => (dispatch) => {
  dispatch(loadingExample());
  balanceGet.get().then((data) => (dispatch(getExample(data))))
};
