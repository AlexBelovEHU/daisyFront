import transactionsget from "../../api/allboxes";

export const getExample = (data) => {
  console.log(data)
  return {
    type: "GET_ALLBOXES",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: false,
});

export const allboxes = (page, ln) => (dispatch) => {
  if (typeof ln != 'string') {
    ln = 'en'

  }
  // dispatch(loadingExample()); 
  return new Promise(async (resolve, reject) => {
    try {
      const data = await transactionsget.get(page, localStorage.getItem("currentLanguage"))
      dispatch(getExample(data));
      resolve(data);
    } catch (error) {
      console.error("Error fetching all boxes:", error);
      reject(error);
    }
  });
};