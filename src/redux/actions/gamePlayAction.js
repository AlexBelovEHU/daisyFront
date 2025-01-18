import gamePlay from "../../api/gamePlay";

export const getExample = (data) => {
  console.log(data)
  
  return {
    type: "GAME_PLAY",
    payload: data,
    loading: false,
  }
};

export const loadingExample = () => ({
  type: "LOADING_EXAMPLE",
  loading: true,
});


export const playGame = (seedHash,nonce,clientSeed,lootboxId,wb) => (dispatch) => {
  dispatch(loadingExample());
  console.log(seedHash)
  gamePlay.post(seedHash,nonce,clientSeed,lootboxId,wb).then((data) => (dispatch(getExample(data))))
}
