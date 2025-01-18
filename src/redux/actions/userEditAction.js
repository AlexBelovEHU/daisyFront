import userEdit from "../../api/userEdit";

export const getExample = (data) => {
  console.log(data)
  
  return {
    type: "USER_EDIT",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: false,
});


export const useredit = (email, password, shippingAddress) => (dispatch) => {
  dispatch(loadingExample());
  userEdit.post(email, password, shippingAddress).then((data) => (dispatch(getExample(data))))
}
