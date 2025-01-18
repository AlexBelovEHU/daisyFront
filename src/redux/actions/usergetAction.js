import userget from "../../api/userget";

export const getExample = (data) => {
  console.log(data)
  
  return {
    type: "GET_EXAMPLE",
    payload: data,
    payloadType:'userGet',
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const userGet = () => (dispatch) => {
  dispatch(loadingExample());
  userget.get().then((data) => (dispatch(getExample(data))))
};
