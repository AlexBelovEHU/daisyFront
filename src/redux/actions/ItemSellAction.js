import itemSell from "../../api/itemSell";



export const getExample = (data) => {
  console.log(data)
  return {
    type: "ITEM_SELL",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const sellItem = (itemid) => (dispatch) => {
  dispatch(loadingExample());
  console.log("Still trying to sell...")
  itemSell.get(itemid).then((data) => (dispatch(getExample(data))))
};
