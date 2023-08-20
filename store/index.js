import { createStore } from 'redux';
import { Provider } from 'react-redux';


const initialState = {
  // placeholder initial state
};

const reducer = (state = initialState, action) => {
  // placeholder reducer logic
  return state;
};

// buat Redux store
const store = createStore(reducer);


export default ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
