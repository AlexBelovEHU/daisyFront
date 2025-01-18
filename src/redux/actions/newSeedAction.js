import seednew from "../../api/seednew";


export const getExample = (data) => {
  console.log(data)
  
  return {
    type: "NEW_SEED",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const newSeed = () => (dispatch) => {
  dispatch(loadingExample());
  seednew.get().then((data) => (dispatch(getExample(data))))
};
