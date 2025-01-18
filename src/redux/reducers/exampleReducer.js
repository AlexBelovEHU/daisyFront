const initialState = {
	payload: [],
	loading: false,
};

const exampleReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_EXAMPLE":
			return {
				...state,
				payload: action.payload.data,
				payloadType:action.payloadType,
				loading: action.loading,
			};
		case "GET_ALLBOXES":
			return {
				...state,
				payload: action.payload.data,
				payloadType:action.type,
				loading: action.loading,
			}
		case "BALANCE_GET": return{
			...state,
			payload: action.payload.data,
			payloadType:action.type,
			loading: action.loading,
		}
		case "LOADING_EXAMPLE":
			return {
				...state,
				loading: action.loading,
			};
		case "NEW_SEED":
			return {
				...state,
				payload: action.payload.data,
				payloadType:action.type,
				loading:action.loading
			}
		case "LOGIN":
			return {
				...state,
				payload: action.payload.data,
				payloadType:action.type,
				loading:action.loading
				
			}
		case "LOGIN_GOOGLE":
			return {
				...state,
				payload: action.payload.data,
				payloadType:action.type,
				loading:action.loading
				
			}
		case "SIGN":
			return {
				...state,
				payload: action.payload.data,
				payloadType:action.type,
				loading:action.loading
				
			}
			case "GAME_PLAY":
				return {
					...state,
					payload: action.payload.data,
					payloadType:action.type,
					loading:action.loading
					
			}
			case "DEPOSIT_EXPAY":
			return {
				...state,
				payload: action.payload.data,
				payloadType:action.type,
				loading:action.loading
				
			}
			case "ITEM_SELL":
				return {
					...state,
					payload: action.payload.data,
					payloadType:action.type,
					loading:action.loading
					
			}
			case "CONTACT_US":
			return {
				...state,
				payload: action.payload.data,
				payloadType:action.type,
				loading:action.loading
				
			}
		
		default:
			return state;
	}
};

export default exampleReducer;
