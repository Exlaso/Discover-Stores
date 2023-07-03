import "@/styles/globals.css";
import { createContext, useReducer } from "react";

export const StoreContext = createContext();
 
export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES : "SET_COFFEE_STORES"
}
const StoreReducer = (state,action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return {...state, latLong: action.payload.latLong  }
      break;
      case ACTION_TYPES.SET_COFFEE_STORES:
        return {...state, coffeeStores: action.payload.coffeeStores   }
        
        break;
        
        default:
          throw new Error(`Unhandled Action type ${action.type}`)
    }
} 
export const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: null,  
    coffeeStores: [],
  };
  const [state,dispatch] = useReducer(StoreReducer,initialState);
  
  return (
    <StoreContext.Provider value={{ state ,dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />;
    </StoreProvider>
  );
}
