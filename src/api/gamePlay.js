import axios from "../config/axiosConfig";


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  post: (seedHash, nonce, clientSeed,lootboxId,free_game) => axios.post(`/game/play${free_game?('/free'):('')}`, {
    "hex_seed_hash": seedHash,
    "nonce": nonce,
    "hex_client_seed": clientSeed,
    "lootbox_id": lootboxId
  }, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  )
    .then(response => {
      console.log(response);
      return response
    })
    .catch(error => {
      console.error('Error making the POST request', error);
      return ({ data:'Error'})
    })
};  