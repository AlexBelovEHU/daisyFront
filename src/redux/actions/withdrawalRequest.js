import itemWithdraw from "../../api/itemWithdraw";



export const getExample = (data) => {
  return {
    type: "WITHDRAWAL",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: false,
});


export const withdrawalReq = (itemId, type, message ={}) => (dispatch) => {
  dispatch(loadingExample());
  return itemWithdraw.post(itemId, type, message)
  .then((data) => {
    dispatch(getExample(data));
    return data; 
  })
};

export const withdrawalReqWithoutLoading = (itemId, type, message ={}) => (dispatch) => {
  return itemWithdraw.post(itemId, type, message)
  .then((data) => {
    dispatch(getExample(data));
    return data; 
  })
};
