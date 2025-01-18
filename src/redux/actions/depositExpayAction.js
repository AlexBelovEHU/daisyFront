/* eslint-disable eqeqeq */
import depositExpay from "../../api/depositExpay";
import depositAntarex from "../../api/depositAntarex";
import depositAntarexFps from "../../api/depositAntarexFps";


export const getExample = (data) => {
  console.log(data)

  return {
    type: "DEPOSIT_EXPAY",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const deposit = (amount, token, currency) => (dispatch) => {
  dispatch(loadingExample());
  if (token == 'azn' || token == 'rub' || token == 'kzt') {
    depositAntarex.post(amount, token, currency).then((data) => (dispatch(getExample(data))))
  }
  else if (token == 'rubfps') {
    depositAntarexFps.post(amount, 'rub', currency).then((data) => (dispatch(getExample(data))))
  } else {
    depositExpay.post(amount, token, currency).then((data) => (dispatch(getExample(data))))
  }
}
